<template>
    <v-app>
        <v-navigation-drawer app v-model="drawer">
           <v-btn>{{ wow }}</v-btn>
        </v-navigation-drawer>
    </v-app>

</template>

<script>
export default{
    data(){
        return{
       wow:"wow",
        }
    }
}
</script>