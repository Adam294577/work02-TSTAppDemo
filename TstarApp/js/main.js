
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
            // link
            const NowRenderSection = ref('login')
            const handLink = (el)=>{
                let key = el.currentTarget.dataset.link
                if(key === 'index'){
                    contentBg.value = "./img/ContBg/index.png"
                    NowRenderSection.value ='home'
                    NavIconBool.value = true
                }
            }
            
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
            // 導覽列
            const NavIcon = reactive({data:[
                {idx:0, key:'home' ,    url:"./img/navIcon/01.png",    act:true},
                {idx:1, key:'service'  ,url:"./img/navIcon/02.png",    act:false},
                {idx:2, key:'discount' ,url:"./img/navIcon/03.png",    act:false},
                {idx:3, key:'setting'  ,url:"./img/navIcon/04.png",    act:false},
            ]})


            const NavIconBool = ref(false)
            const navIconImg = ref('./img/navIcon/01.png')
            const handNavIcon = (el) =>{
                let key = el.currentTarget.dataset.nav
                NavIcon.data.forEach(item=>{
                    item.act = false
                    if(key === item.key){
                        item.act = true
                    }
                    if(item.act){
                        navIconImg.value = `./img/navIcon/0${item.idx + 1}.png`
                    }
                })
            }            
            // 首頁- calldata
            const calldataStatus = ref('open')
            const handCalldataStatus = (el) =>{
                let key = el.currentTarget.dataset.status
                if(key === 'open'){
                    calldataStatus.value = 'close'
                }
                if(key === 'close'){
                    calldataStatus.value = 'open'
                }
            }
            // service - Nav
            const serviceNav = reactive({data:[
                {key:"et" ,msg:"影音娛樂" , act: true},
                {key:"rt" ,msg:"續約/升5G" , act: false},
                {key:"aq" ,msg:"辦新門號" , act: false},
            ]})
            const handserviceNav =(el)=>{
                let key = el.currentTarget.dataset.service
                serviceNav.data.forEach(item=>{
                    item.act = false
                    if(key === item.key){
                        item.act = true
                    }
                })
            }
            const serviceItem = reactive({data:[
                {key:"et" ,num:1, title:'Disney+',msg:'標準方案(原價270/月)',price:'$270/月'},
                {key:"et" ,num:2, title:'MyVideo',msg:'首次申裝 前30天免費',price:'首月免費'},
                {key:"et" ,num:3, title:'Tinder 交友平台',msg:'情人節孤單終結 右滑配對正桃花',price:'$470/月'},
                {key:"et" ,num:4, title:'來電答鈴',msg:'好音樂襯托你的好品味',price:'$30/月'},
            ]})
            const serviceItemNodata = ref(false)
            const serviceItemRender = computed(()=>{
                let arr = []
                let key = ''
                serviceNav.data.forEach(item=>{
                    if(item.act){
                        key = item.key 
                    }
                })
                arr = serviceItem.data.filter(item=>{
                    return item.key === key
                })
                if(arr.length === 0){
                    serviceItemNodata.value = true
                }else{
                    serviceItemNodata.value = false
                }
                return arr

            })
            return{
                // link
                NowRenderSection,
                handLink,
                contentBg,
                // Login
                LoginStep,
                handNextLogin,
                // 導覽列   
                navIconImg,                 
                NavIcon,
                NavIconBool,
                handNavIcon, 
                // 首頁- calldata  
                handCalldataStatus,
                calldataStatus,   
                 // service - Nav   
                serviceNav,
                handserviceNav,
                serviceItemNodata,
                serviceItemRender,
            }   
            
        },

    }
    createApp(App).mount("#app")     

}


