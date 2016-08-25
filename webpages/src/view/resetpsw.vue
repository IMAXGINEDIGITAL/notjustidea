<template>
    <layout>
        <title></title>
        <aform :email="email" :active-code="activeCode"></aform>
    </layout>
</template>

<style scoped>
</style>

<script>
import {parseQuery} from '../common/util';
import accountLayout from '../component/accountLayout.vue';
import signTitle from '../component/signTitle.vue';
import resetpswForm from '../component/resetpswForm.vue';

export default {
    data() {
        return {
            email: '',
            activeCode: '',
        }
    },

    components: {
        layout: accountLayout,
        title: signTitle,
        aform: resetpswForm
    },

    created() {
        const query = parseQuery(global.location.search.replace(/^\?/, ''));
        this.email = query.email;
        this.activeCode = query.activeCode;
    }
}
</script>