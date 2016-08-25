<template>
    <layout>
        <title></title>
        <aform></aform>
        <links class="links" text="登录" url="signin.html"></links>

    </layout>
</template>

<style scoped>
    .links {
        margin-top: 28px;
    }
</style>

<script>
import accountLayout from '../component/accountLayout.vue';
import signTitle from '../component/signTitle.vue';
import signupForm from '../component/signupForm.vue';
import signLinks from '../component/signLinks.vue';

export default {
    components: {
        layout: accountLayout,
        title: signTitle,
        aform: signupForm,
        links: signLinks
    }
}
</script>