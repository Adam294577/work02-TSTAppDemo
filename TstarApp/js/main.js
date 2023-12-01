
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            // contentBg
            const contentBg = ref('./img/ContBg/UserlogIn.png')
            // Login
            const LoginStep = ref(0)
            const handNextLogin = (el) =>{
                let key = el.currentTarget.dataset.login
                if(key === 'next'){
                    LoginStep.value ++
                }
                if(LoginStep.value === 1){
                    contentBg.value = "./img/ContBg/UserlogIn02.png"
                }
            }
            return{
                contentBg,
                // Login
                LoginStep,
                handNextLogin,
            }   
        },

    }
    createApp(App).mount("#app")     

}


