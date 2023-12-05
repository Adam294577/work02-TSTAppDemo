
window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
        //  UserData
        const DemoUserData = reactive({
        InfoData:[{
            name:'宋卉雯',phoneNum:'0908868755',password:'amanda123'},
        ],
        contractData:[{
            key:'4G_無約單門號專案',
            summaryMsg:['同4G牌告資費(降速之行動上網不計費)','*此專案優惠內容為終身優惠，惟終'],
            detailMsg:['同4G牌告資費(降速之行動上網不計費)','*此專案優惠內容為終身優惠，惟終止契約、降轉資費或異動專案時，專案優惠內容即終止'],
            deadline:{msg:'2015/02/25 ~ 2015/02/25'}
        }],
        PhoneStatusData:[

        ]})
        // quickLink
        const quickLinkData = reactive({data:[
            {key:'login',link:['登入狀態',]},
            {key:'index_home',link:['帳單',"手機裝置"]},
            {key:'index_service',link:['',]},
            {key:'index_discount',link:['',]},
            {key:'index_setting',link:['帳單',]},
            {key:'none',link:['']}
        ]})
        const quickLinkRender = computed(()=>{
            let key = NowRenderSection.value
            if(key === 'index'){
                NavIcon.data.forEach(item=>{
                    if(item.act){
                        key = `index_${item.key}`
                    }
                })
            }
            if(key === 'detail'){
                key ='none'
            }            
            let result = []
            result = quickLinkData.data.filter(item=>{
                if(item.key === key) return item
            })

            
            
            console.log('最後的key:',key);
            console.log('要顯示的Link資料:',result[0].link);
            return result[0].link

            
        })
        // loginSection
            const NowRenderSection = ref('login')
            const SkiploginSection = (el)=>{
                let key = el.currentTarget.dataset.link
                if(key === 'index'){
                    contentBg.value = "./img/ContBg/index.png"
                    NowRenderSection.value ='index'
                }
            }
        // homeSection
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
            // 首頁or設定 - 帳單
            const BillStatus = ref("有餘額")
            const handBillStatus = (el) =>{
                const key = el.currentTarget.dataset.key 
                if(key === '有餘額'){
                    BillStatus.value = '有餘額'
                }
                if(key === '無餘額'){
                    BillStatus.value = '無餘額'
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
        // detail->index
        const handtoIndexSection = (el) =>{
            let key = el.currentTarget.dataset.detail
            if(key === 'index'){
                NowRenderSection.value = 'index'
                contentBg.value = './img/ContBg/index.png'
                return
            }
        }
        // detailSection - href
            const detailCont = ref(['key','headerName'])
            const backBtnBool = ref(true)

            const OuterLinkdata = reactive({data:[
                {txt:'',        key:'',         url:''},
                {txt:'',        key:'會員註冊',         url:'https://oauth.taiwanmobile.com/MemberOAuth/twm/login/ed69ee19c30f51db57c4428f02bc78db'},
                {txt:'',        key:'serviceMail_QA',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/serviceMail_QA.php'},
                {txt:'',        key:'記錄查詢',         url:'https://emall.tstarcs.taiwanmobile.com/eMall/order/search?t=1701619200045'},
                {txt:'',        key:'線上溢繳',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/over-pay-auth_s.php?t=1701619200045'},
                {txt:'',        key:'優惠券',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/Dashboard_coupon.php'},
                {txt:'',        key:'網內外門號查詢',         url:'https://www.taiwanmobile.com/cs/queryTWMPhoneNbr/enterPage.htm?t=1701619200045'},
                {txt:'',        key:'手機維護保固',         url:'https://www.taiwanmobile.com/cs/public/trusIndex.action?t=1701619200045'},
                {txt:'',        key:'案件查詢',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/caseSearch_s.php?t=1701619200045'},
                {txt:'',        key:'聯絡客服',         url:'https://littlemy.taiwanmobile.com/?eservice=TSTAPP&TA=null&M=null'},
                {txt:'',        key:'電子發票與載具設定',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/electronicInvoice.php'},
                {txt:'',        key:'信用卡自動轉帳代繳設定',         url:'https://oauth.taiwanmobile.com/MemberOAuth/sso/SSOLogin?sso_token=tUnX%7EpxcjWbXH.--TyPArmQ.qSyMjnGwcGn%3D&landing_uri=https://ow.tstarcs.taiwanmobile.com/TWM/credit-card-direct-debit.php?t=1701619200045'},
                {txt:'',        key:'國際漫遊',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/roaming_apply.php?t=1701619200045'},
                {txt:'',        key:'門號用量加購',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/transQuanPlug_s.php'},
                {txt:'',        key:'MOMO_麥當勞55折起',         url:'https://momo.dm/mmjNvj'},
                {txt:'',        key:'老客戶專屬優惠',url:'https://sso.tstarcs.taiwanmobile.com/mc-ws/twm/sso/apptoken.action?appToken=tst5457E361347647AA981D1B38621F2DB5SF4Kk&ru=https%3A%2F%2Fshop.tstartel.com%2Fpromo_market%2F188sptd_23%2Findex.html'},
                {txt:'disney+', key:'et1',         url:'https://disneyplus.taiwanmobile.com/'},
                {txt:'來電答鈴', key:'et4',         url:'https://oauth.taiwanmobile.com/MemberOAuth/sso/SSOLogin?sso_token=%2BPu-MXCvyBsqsZ-bmeWYiFzabH_N%7EnBT.BF%3D&landing_uri=http://rbt.tstartel.com/web/web/index.jsp'},
                {txt:'',        key:'5G台灣隊迎星',         url:'https://www.myfone.com.tw/mbuy/index.php?action=tstarfriends&utm_source=tstar&utm_medium=tstapp&utm_campaign=tstarfriends_2312&utm_term=tstarfriends'},
                {txt:'',        key:'myfone萬元禮券',         url:'https://www.myfone.com.tw/mbuy/index.php?action=myfone-sale&utm_source=tstar&utm_medium=tstapp&utm_campaign=tstarfriends_myfone_sale2312&utm_term=tstarfriends'},
            ]})
            const handOuterLink = (el) =>{
                let key = el.currentTarget.dataset.detail
                OuterLinkdata.data.forEach(item=>{
                    if(item.key === key){
                        window.open(item.url, '_blank', 'height=1200, width=500');
                    }
                })                
            }
            const handdetailSection = (el) =>{
                let key = el.currentTarget.dataset.detail
                console.log('detail:',key);

                if( key === 'login'){
                    NowRenderSection.value = 'login'
                    contentBg.value = './img/ContBg/UserlogIn.png'
                    return
                }
                if(key === 'index'){
                    NowRenderSection.value = 'index'
                    contentBg.value = './img/ContBg/index.png'
                    return
                }
                if(key ==='合約方案'){
                    detailCont.value[0] = '合約方案'
                    detailCont.value[1] = '合約方案'
                    NowRenderSection.value = 'detail'
                    contentBg.value = './img/ContBg/black.png'
                    return
                }          
                if(key ==='billshop'){
                    detailCont.value[0] = 'billshop'
                    detailCont.value[1] = '超商繳費條碼'
                    NowRenderSection.value = 'detail'
                    contentBg.value = './img/ContBg/gray.png'
                    return
                }          
                if(key ==='訊息中心'){
                    detailCont.value[0] = '訊息中心'
                    detailCont.value[1] = '訊息中心'
                    NowRenderSection.value = 'detail'
                    contentBg.value = './img/ContBg/gray.png'
                    return
                }          
                if(key ==='帳單明細'){
                    detailCont.value[0] = '帳單明細'
                    detailCont.value[1] = '多門號切換繳款與帳單明細'
                    NowRenderSection.value = 'detail'
                    contentBg.value = './img/ContBg/gray.png'
                    return
                }          
                handOuterLink(el)      
            }



            
            
            return{
                // link
                quickLinkRender,
                NowRenderSection,
                SkiploginSection,
                contentBg,
                // scrollEl
                scrollEl,
                // Login
                LoginStep,
                handNextLogin,
                // 導覽列   
                navIconImg,                 
                NavIcon,
                handNavIcon, 
                // 首頁- calldata  
                handCalldataStatus,
                calldataStatus,   
                // 首頁、設定 bill
                BillStatus,
                handBillStatus,
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
                // detail
                backBtnBool,
                detailCont,
                handtoIndexSection,
                handdetailSection,
                // outerLink
                handOuterLink,


            }   
            
        },

    }
    createApp(App).mount("#app")     

}


