<template>
    <layout>
        <title></title>
        <aform :email="email"></aform>
    </layout>
</template>

<style scoped>
</style>

<script>
import {parseQuery} from '../common/util';
import accountLayout from '../component/accountLayout.vue';
import signTitle from '../component/signTitle.vue';
import activateForm from '../component/activateForm.vue';

export default {
    data() {
        return {
            email: ''
        }
    },

    components: {
        layout: accountLayout,
        title: signTitle,
        aform: activateForm
    },

    created() {
        const query = parseQuery(global.location.search.replace(/^\?/, ''));
        this.email = query.email;
    }
}
</script>