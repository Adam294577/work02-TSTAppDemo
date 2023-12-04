
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
            // scrollEl
            const scrollEl = ref(null)
            
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
                let lastRenderis = ''
                NavIcon.data.forEach(item=>{
                    if(item.act) return lastRenderis = item.key
                })
                if(key === lastRenderis) return

                NavIcon.data.forEach(item=>{
                    item.act = false
                    if(key === item.key){
                        item.act = true
                    }
                    if(item.act){
                        navIconImg.value = `./img/navIcon/0${item.idx + 1}.png`
                    }

                    if(key === 'setting'){
                        settingNavIs.value = '基本管理'
                    }
                    if(key === 'service'){
                        serviceNav.data.forEach(item=>{
                            item.act = false
                            if(item.key === 'et'){
                                item.act = true
                            }
                        })
                    }
                })
                scrollEl.value.scrollTop = 0
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
                {key:"et1" , title:'Disney+',msg:'標準方案(原價270/月)',price:'$270/月'},
                {key:"et2" , title:'MyVideo',msg:'首次申裝 前30天免費',price:'首月免費'},
                {key:"et3" , title:'Tinder 交友平台',msg:'情人節孤單終結 右滑配對正桃花',price:'$470/月'},
                {key:"et4" , title:'來電答鈴',msg:'好音樂襯托你的好品味',price:'$30/月'},
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
                    return item.key.slice(0,2) === key
                })
                if(arr.length === 0){
                    serviceItemNodata.value = true
                }else{
                    serviceItemNodata.value = false
                }
                return arr

            })
            // setting- Nav
            const settingNavIs = ref('基本管理')
            const handsettingNav = (el) =>{
                let key = el.currentTarget.dataset.key
                settingNavIs.value = key
            }
            // setting- List
            const settingList = reactive({data:[
                {idx:1 ,type: 'serviceApply',msg:'國際漫遊'},
                {idx:2 ,type: 'serviceApply',msg:'原台灣之星VoLTE服務'},
                {idx:3 ,type: 'serviceApply',msg:'門號設定'},
                {idx:1 ,type: 'generalSetting',msg:'信用卡自動轉帳代繳設定'},
                {idx:2 ,type: 'generalSetting',msg:'電子帳單設定'},
                {idx:3 ,type: 'generalSetting',msg:'電子發票與載具設定'},
                {idx:3 ,type: 'generalSetting',msg:'電子發票與載具設定'},
                {idx:1 ,type: 'customService',msg:'聯絡客服'},
                {idx:2 ,type: 'customService',msg:'案件查詢'},
                {idx:3 ,type: 'customService',msg:'手機維護保固'},
                {idx:4 ,type: 'customService',msg:'網內外門號查詢'},
                {idx:1 ,type: 'serviceManagement',msg:'Google Play'},
                {idx:2 ,type: 'serviceManagement',msg:'小額付款'},
                {idx:3 ,type: 'serviceManagement',msg:'更多設定'},
            ]})

            const packageSettingList =  (arr) =>{
                let Newarr = []
                Newarr = arr.map(item=>{
                    item.url = `./img/setting/list/${item.type}${item.idx}.png`
                    item.key = `${item.type}${item.idx}`
                    return item
                })
                
                return Newarr
            }
            const serviceApplyRender = computed(()=>{
                let data = settingList.data.filter(item=>{
                    if(item.type === 'serviceApply') return item
                })
                data = packageSettingList(data)
                return data

            })
            const generalSettingRender = computed(()=>{
                let data = settingList.data.filter(item=>{
                    if(item.type === 'generalSetting') return item
                })
                data = packageSettingList(data)
                console.log(data);
                return data

            })
            const customServiceRender = computed(()=>{
                let data = settingList.data.filter(item=>{
                    if(item.type === 'customService') return item
                })
                data = packageSettingList(data)
                return data

            })
            const serviceManagementRender = computed(()=>{
                let data = settingList.data.filter(item=>{
                    if(item.type === 'serviceManagement') return item
                })
                data = packageSettingList(data)
                data = data.map(item=>{
                    if(item.msg === 'Google Play' || item.msg === '小額付款'){
                        item.bool = true
                    }else{
                        item.bool = false
                    }
                    return item
                })
                return data

            })
            
            return{
                // link
                NowRenderSection,
                handLink,
                contentBg,
                // scrollEl
                scrollEl,
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
                // setting- Nav
                settingNavIs,
                handsettingNav,
                serviceApplyRender,
                generalSettingRender,
                customServiceRender,
                serviceManagementRender,

            }   
            
        },

    }
    createApp(App).mount("#app")     

}


