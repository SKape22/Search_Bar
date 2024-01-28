<template>
    <div class="border mr-5 mb-5 flex items-center rounded-md">
        {{ option }}
        <span @click="removeSelected" class="cursor-pointer ml-5">✖</span>
    </div>
</template>
  
<script setup>
    const props = defineProps(['option', 'key']);
    console.log(props);
    const removeSelected = () => {
        props.removeSelected(props.option);
    };
</script>
  