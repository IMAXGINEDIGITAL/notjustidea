<template>
    <layout>
        <title></title>
        <aform></aform>
    </layout>
</template>

<style scoped>
</style>

<script>
import accountLayout from '../component/accountLayout.vue';
import signTitle from '../component/signTitle.vue';
import findpswForm from '../component/findpswForm.vue';

export default {
    components: {
        layout: accountLayout,
        title: signTitle,
        aform: findpswForm
    }
}
</script>