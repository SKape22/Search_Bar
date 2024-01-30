import { ref, watch, onMounted, toRaw } from 'vue'
import { defineStore } from 'pinia'
import debounce from 'lodash.debounce';

export const useSearchStore = defineStore('search', () => {
  const search = ref('');
  const users = ref([]);
  const apiData = ref([])

  function addUser(item) {
    users.value = [...users.value, item];
    search.value = '';
    filterData();
  }
  
  function removeUser(index) {
    const removedUser = users.value.splice(index, 1)[0];
    const updatedApiData = apiData.value.filter(user => user.id !== removedUser.id);
    const indexToInsert = updatedApiData.findIndex(user => user.id > removedUser.id);
    
    if (indexToInsert !== -1) {
        updatedApiData.splice(indexToInsert, 0, removedUser);
    } else {
        updatedApiData.push(removedUser);
    }

    apiData.value = updatedApiData;
  }

  function handleKeyPress(e) {
    if (e.key === 'Backspace' && search.value === "") 
      users.value.pop();
  }

  async function filterData() {
    apiData.value = apiData.value.filter(apiEntry => {
      return !users.value.some(userEntry => {
        return apiEntry.id === userEntry.id;
      });
    });
  }

  async function handleClick(item) {
    addUser(item);
  }

  const fetchData = async (url) => {
    try {
        console.log(users.value);
        const response = await fetch(url);
        const data = await response.json();
        apiData.value = data.result;
        await filterData();

    } catch (error) {
        console.error('Error fetching data from API:', error);
    }
  };

  onMounted(async () => {
    await fetchData(`http://localhost:3000/users?description`);
  });

  const getUsers = debounce(async() => {
    try {
        await fetchData(`http://localhost:3000/users?description=${search.value}`);
    } catch (error) {
        console.log('Error fetching data from API:', error.message)
    }
  }, 400)

  watch(search, getUsers);

  return { search, users, apiData, handleKeyPress, removeUser, addUser, handleClick }
})
