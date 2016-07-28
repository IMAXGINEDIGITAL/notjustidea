<template>
    <div>Hello <name></name></div>
</template>

<script>
import name from '../component/name.vue';

export default {
    components: {
        name: name
    }
}
</script>