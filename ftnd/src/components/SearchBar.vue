<script setup>
  import { computed, onMounted, ref, watch, toRaw} from 'vue';
  import debounce from 'lodash.debounce'
  import usersData from '@/assets/usersData.json'
  import { useSelectionStore } from '../stores/SelectedUsers'

  const selectedUsers = useSelectionStore();

  const source = ref(usersData);
  const search = ref("");
  const isOpen = ref(false);
  let APIdata = []

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.result)
      console.log('API request successful');
      APIdata = data.result;
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  const getUsers = debounce(async() => {
    try {
      fetchData(`http://0.0.0.0:3000/users?description=${search.value}`);
    } catch (error) {
      console.log('Error fetching data from API:', error.message)
    }

  }, 600)

  onMounted(async () => {
    fetchData(`http://0.0.0.0:3000/users?description`);
  });

  watch(search, getUsers);

  // const searchResults = computed(() => {
  //   if (search.value === '') {
  //     return [];
  //   }
  //   return source.value.filter(item => {
  //     if (item.name.toLowerCase().includes(search.value.toLowerCase())) {
  //       return item;
  //     }
  //   })
  // })

  const setselected = item => {
    isOpen.value = false;
    search.value = "";
    selectedUsers.addUser(item);
  }

  const handleInput = event => {
    isOpen.value = true;
    search.value = event.target.value
    console.log(toRaw(APIdata));
  }

  const handleInputClick = event => {
    isOpen.value = true;
    console.log(toRaw(APIdata));
    console.log(APIdata.length)
  }

  const handleSelectionClick = event => {
    selectedUsers.removeUser(event.target.textContent);
  }

</script>

<template>
  <div class="w-full relative">
    <input
      type="search"
      class="absolute border-b-2 w-full py-3 pl-10 pr-5"
      placeholder="Add New User ..." 
      v-model="search"
      @input="handleInput"
      @click="handleInputClick"
    />
    <svg 
    class="w-6 h-6 text-gray-700 absolute top-3 left-2" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      >
      </path>
    </svg>
    <ul 
      v-show="APIdata.length && isOpen"
      class="w-full max-h-60 border border-gray-300 rounded-md mt-12 bg-white absolute overflow-y-auto scroll-smooth"
    >
      <li 
        class="px-4 py-3 border-b border-gray-200 text-stone-600 cursor-pointer hover:bg-gray-100 transition-colors"
        v-for="result in APIdata" 
        :key="result.name"
        @click="setselected(result.name)"
      >
        {{ result.name }}
      </li>
    </ul>
    <div class="absolute -top-16 left-0 flex flex-row flex-wrap items-center gap-2">
      <div 
        class="pr-5 pl-5 border border-gray-200 bg-white rounded-xl flex justify-between"
        v-for="selected in toRaw(selectedUsers.selection)"
        @click="handleSelectionClick"
      >
      {{ selected }}
    </div>
    </div>
  </div>
</template>


<style scoped>
  body {
  background-color: #F3F3FB;
  min-height: 100vh;
  display: grid;
  place-content: center;
  padding: 2em;
  }

  input::placeholder {
    color: #374151;
  }

  input:focus {
    outline: none;
  }

  span {
    width: 73px;
    height: 7px;
  }
</style>

