<template>
    <layout>
        <title></title>
        <aform></aform>
        <links class="links" text="注册" url="signup.html"></links>
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
import signLinks from '../component/signLinks.vue';
import signinForm from '../component/signinForm.vue';

export default {
    components: {
        layout: accountLayout,
        title: signTitle,
        links: signLinks,
        aform: signinForm
    }
}
</script>