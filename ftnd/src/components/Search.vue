<template>
    <div class="w-full my-6 border border-b-blue-800 border-b-4" ref="closeDropdown">
        <div
            class="flex flex-wrap h-auto items-center justify-start gap-4 border border-gray-200 rounded-lg p-3 overflow-x-hidden overflow-y-auto"
        >
            <span
                class="flex items-center px-2 py-0 bg-gray-400/50 rounded-3xl space-x-2 justify-between"
                v-for="(t,i) in searchStore.users"
                :key="i"
            >
                <span class="text-gray-800 text-sm">{{ t.name }}</span>
                <span 
                    class="m-2 h-4 stroke-gray-600 cursor-pointer relative -top-0.5" 
                    @click="()=> searchStore.removeUser(i)"
                >
                <svg class="h-5 w-5 text-black"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
                </span>
            </span>
            <input 
                type="text" 
                class="h-full size-28 flex-grow outline-none bg-transparent border-none" 
                v-model="searchStore.search"
                placeholder="Add new user..." 
                @keydown="searchStore.handleKeyPress"
                @click="handleInputClick"
            />
        </div>
        <div class="absolute top-3/2 w-1/2">
            <ul 
                v-show="searchStore.apiData?.length && isOpen"
                class="w-full max-h-60 border border-gray-300 rounded-md mt-1 bg-white overflow-y-auto scroll-smooth"
            >
                <li 
                    class="px-4 py-3 border-b flex justify-between border-gray-200 text-stone-600 cursor-pointer hover:bg-gray-100 transition-colors"
                    v-for="(result, index) in searchStore.apiData" 
                    :key="index"
                    @click="searchStore.handleClick(result)"
                >
                    <span>
                        {{ result.name }}
                    </span>
                    <span>
                        {{ result.email }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
    import { useSearchStore } from '@/stores/SelectedUsers'
    import { onClickOutside } from '@vueuse/core'
    
    const searchStore = useSearchStore();

    const isOpen = ref(false);
    const closeDropdown = ref(null);

    const handleClose = (event) => {
        if (event.key === 'Escape')
        isOpen.value = false;
}

    onClickOutside(closeDropdown, () => isOpen.value = false)

    onMounted(() => {
        document.addEventListener('keyup', handleClose)
    })

    onUnmounted(() => {
        document.addEventListener('keyup', handleClose)
    })
    
    function handleInputClick() {
        isOpen.value = true;
    }




</script>