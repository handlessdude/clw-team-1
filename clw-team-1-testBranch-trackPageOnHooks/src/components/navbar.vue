<template>
    <div class="navbar">
        <div class="navbar__real">
            <div class="navbar__openarrow">
                <i class="fas fa-angle-down"></i>              
            </div>
            <div class="navbar__circle"></div>
            <select class="navbar__auth" v-model="selected">
                <option value="false">Иван Иванов : Студент</option>
                <option value="true">Петр Петров : Педагог</option>
            </select>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            selected: false,
        }
    },
    methods: {
        ...mapMutations([
            'setUserRole'
        ])
    },    
    watch: {
        selected: function () {
            this.$store.commit('setUserRole', this.selected)        }
    }
    
}
</script>

<style lang="sass" scoped>
.navbar
    width: 100%
    height: 46px
    &:hover .navbar__real
        height: 46px
    &:hover .navbar__auth
        opacity: 1
    &__real
        width: 100%
        height: 4px
        background-color: #768285 
        transition: all 0.5s
        position: relative
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
    &__circle
        position: absolute
        width: 40px
        height: 40px    
        background-color: #768285
        bottom: -13px
        border-radius: 50px
        z-index: 0
    &__openarrow
        position: absolute
        bottom: -12px
        z-index: 1
        color: #f2f2f2
    &__auth
        transition: all 0.2s
        opacity: 0
        align-self: flex-end   
        margin-right: 10px
        outline: none
        height: 30px
        border: 3px solid #355E66
        border-radius: 50px
        padding-left: 12px
        padding-right: 12px 
        
        
</style>