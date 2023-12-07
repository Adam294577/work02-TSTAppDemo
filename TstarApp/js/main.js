
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
        // 初始資料
        const NowRenderSection = ref('login')
        const contentBg = ref('./img/ContBg/UserlogIn.png')        
        // quickLink
        const quickLinkData = reactive(
            {data:[
            {key:'login',link:['登入狀態',]},
            {key:'index_home',link:['帳單',"手機裝置"]},
            {key:'index_service',link:['',]},
            {key:'index_discount',link:['',]},
            {key:'index_setting',link:['帳單',]},
            {key:'detail_帳單明細',link:['小額代收明細','通話帳單明細']},
            {key:'none',link:['']}
            ]})


            // quickLinkList裡面 註解的表示還沒binding statusKey內容
        const quickLinkList = reactive({data:[
            {idx:0, search:'登入狀態', title: '登入狀態' , statusFn:'skip帳密' , statusIs:'none',
            arr:[{statusKey:'skip帳密',msg:'跳過登入帳密'}]},
            {idx:1 ,search:'帳單', title: '帳單' ,        statusFn:'帳單餘額調整' , statusIs:'有餘額',
            arr:[{statusKey:'有餘額',msg:'有餘額未繳'},{statusKey:'無餘額',msg:'已完成繳款'}]},
            // {idx:2 ,search:'手機裝置', title: '手機裝置' , statusFn:'手機裝置更換' , statusIs:'androidPhone',
            // arr:[{statusKey:'androidPhone',msg:'Android'},{statusKey:'iPhone',msg:'Apple'}]},
            // {idx:3 ,search:'小額代收明細', title: '小額代收' ,        statusFn:'小額代收使用狀況' , statusIs:'有使用',
            // arr:[{statusKey:'有使用',msg:'有使用'},{statusKey:'未使用',msg:'未使用'}]},            
            // {idx:4 ,search:'通話帳單明細', title: '通話帳單' ,        statusFn:'通話使用狀況' , statusIs:'未使用',
            // arr:[{statusKey:'有使用',msg:'有使用'},{statusKey:'未使用',msg:'未使用'}]},            
            {idx:5 ,search:'', title: '' ,        statusFn:'' , statusIs:'',
            arr:[{statusKey:'',msg:''},{statusKey:'',msg:''}]},            
        ]})            
        const quickLinkContIs = (key) =>{
            if(key === 'index'){
                NavIcon.data.forEach(item=>{
                    if(item.act){
                        key = `index_${item.key}`
                    }
                })
            }
            if(key === 'detail'){
                
                InnerLinkdata.data.forEach(item=>{
                    if(detailCont.value[0] === item.key){
                        key = `detail_${item.key}`
                    }
                })                
            }   
            return key
        }
        const quickLinkRender = computed(()=>{
            let key = NowRenderSection.value
            key =  quickLinkContIs(key)
            // console.log('quickLink的區域為:',key);

            let resultKey = []
            let resultRender = []
           
            resultKey = quickLinkData.data.filter(item=>{
                if(item.key === key) return item
            })

            if(resultKey.length === 0){
                resultRender = []
                // console.log('無quickLink要render')
                return resultRender
            }
           
            console.log('要顯示的Link資料的Key有哪些:',resultKey[0].link);
            resultKey[0].link.forEach(key=>{
                // console.log(key);
                let arr = []
                arr = quickLinkList.data.filter(item=>{
                    if(item.search === key) return item
                })
                resultRender.push(arr)
                resultRender = resultRender.flat()
            })
            
            console.log('要用來Render quickLink的data',resultRender);
            return resultRender
            
        })
        const handquickLinkStatus = (el) =>{
            let key = el.currentTarget.dataset.key
            let statusFn = el.currentTarget.dataset.fn
            let modifyIdx = 0
            let modifykey = ''
            console.log('要調整情境的狀態是:',statusFn);
            console.log('要改變狀態的key',key);
            if(statusFn === 'skip帳密'){
                contentBg.value = "./img/ContBg/index.png"
                NowRenderSection.value ='index'
                return
            }
            let usedLinkIs = []
            usedLinkIs = quickLinkList.data.filter(item=>{
                if(item.statusFn === statusFn){
                    modifyIdx = item.idx
                    return item
                }
            })
            
            usedLinkIs[0].arr.forEach(result=>{
                if(result.statusKey === key){
                    modifykey = result.statusKey
                }
            })
            quickLinkList.data.forEach(item=>{
                if(item.idx === modifyIdx){
                    item.statusIs = modifykey
                }
            })
        }
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
        // homeSection
            // scrollEl
            const scrollEl = ref(null)
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
        //href Control
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
            const InnerLinkdata = reactive({data:[
                {key:'', headerTxt:'',              contentBg:''},
                {key:'訊息中心', headerTxt:'訊息中心',              contentBg:'./img/ContBg/gray.png'},
                {key:'帳單明細', headerTxt:'多門號切換繳款與帳單明細',contentBg:'./img/ContBg/gray.png'},
                {key:'合約方案', headerTxt:'合約方案',              contentBg:'./img/ContBg/black.png'},
                {key:'billshop', headerTxt:'超商繳費條碼',              contentBg:'./img/ContBg/gray.png'},
            ]})
            const handOuterLink = (el) =>{
                let key = el.currentTarget.dataset.href
                OuterLinkdata.data.forEach(item=>{
                    if(item.key === key){
                        window.open(item.url, '_blank', 'height=1200, width=500');
                    }
                })                
            }

            const handHrefCont = (el) =>{
                let key = el.currentTarget.dataset.href
                let IsInnerLink = false
                console.log('href:',key);

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
                InnerLinkdata.data.forEach(item=>{
                    if(key === item.key){
                        NowRenderSection.value = 'detail'
                        detailCont.value[0] = item.key
                        detailCont.value[1] = item.headerTxt
                        contentBg.value = item.contentBg
                        IsInnerLink = true
                    }
                })
                if(!IsInnerLink){
                    handOuterLink(el)      
                    return
                }
                console.warn('尚未指定href');
            }
        // detail - 多門號切換繳款與帳單明細
        const billNavIs = ref('近12期帳單')
        const handbillNav = (el) =>{
            let key = el.currentTarget.dataset.key
            if(key === '近12期帳單'){
                billNavIs.value = key
                return
            }
            if(key === '繳款紀錄'){
                billNavIs.value = key
                nearlyBillData.data.forEach(item=>{
                    item.open = false
                })
                return
            }
        }
        const nearlyBillData = reactive({data:[
            {idx:0 , billDate:'2023年11月', open: true, 
            paySummary:{phone: '09088***55', paydeadline: '20231129', canpayDate:'20231111', lastpayMoney: 199,lastpayed:0, thispayMoney: 200 ,totalMoney:399},
            payDetails:[
                {title:'月租費',msg:'數據199型月租費1011-1110',cost:199},
                {title:'國內通信費',msg:'網外簡訊費',cost:1},
            ],
            phoneDetail: true,
            micropayDetail: false,
            },
            {idx:1 , billDate:'2023年10月', open: false, 
            paySummary:{phone: '09088***55', paydeadline: '20231029', canpayDate:'20231011', lastpayMoney: 398,lastpayed:398, thispayMoney: 199 ,totalMoney:199},
            payDetails:[
                {title:'月租費',msg:'數據199型月租費0911-1010',cost:199},
            ],
            phoneDetail: false,
            micropayDetail: false,
            },
            {idx:2 , billDate:'2023年09月', open: false, 
            paySummary:{phone: '09088***55', paydeadline: '20230929', canpayDate:'20230911', lastpayMoney: 199,lastpayed:0, thispayMoney: 199 ,totalMoney:398},
            payDetails:[
                {title:'月租費',msg:'數據199型月租費0811-0910',cost:199},
            ],
            phoneDetail: false,
            micropayDetail: false,
            },
            {idx:3 , billDate:'2023年08月', open: false, 
            paySummary:{phone: '09088***55', paydeadline: '20230829', canpayDate:'20230811', lastpayMoney: 398,lastpayed:398, thispayMoney: 199 ,totalMoney:199},
            payDetails:[
                {title:'月租費',msg:'數據199型月租費0711-0810',cost:199},
            ],
            phoneDetail: false,
            micropayDetail: false,
            },
            {idx:3 , billDate:'2023年07月', open: false, 
            paySummary:{phone: '09088***55', paydeadline: '20230729', canpayDate:'20230711', lastpayMoney: 199,lastpayed:0, thispayMoney: 199 ,totalMoney:398},
            payDetails:[
                {title:'月租費',msg:'數據199型月租費0611-0710',cost:199},
            ],
            phoneDetail: false,
            micropayDetail: false,
            },
        ]})
        const handnearlyBillItem = (el) =>{
            let key = el.currentTarget.dataset.key
            nearlyBillData.data.forEach(item=>{
                
                if(key === item.billDate && item.open === true) return item.open = false
                item.open = false
                if(key === item.billDate){
                    item.open =  true
                }
            })
        }        
        const payRecordData = reactive({data:[
            {idx:0 , open: false, payDate: '2023/11/29', wherePay: '線上繳款-APP', howPay: '信用卡', payIs:399},
            {idx:1 , open: false, payDate: '2023/09/19', wherePay: '線上繳款-APP', howPay: '信用卡', payIs:398},
            {idx:2 , open: false, payDate: '2023/07/14', wherePay: '線上繳款-APP', howPay: '信用卡', payIs:398},
        ]})
        const handpayRecordItem = (el) =>{
            let key = el.currentTarget.dataset.key
            console.log(key);
            payRecordData.data.forEach(item=>{
                if(key === item.payDate && item.open === true) return item.open = false
                    item.open = false
                if(key === item.payDate){
                    item.open =  true
                }
            })
        }
        const billNoticeBool = ref(false)
        const handbillNoticeBool = (el)=>{
            let key = el.currentTarget.dataset.key
            if(key === 'cancel'){
                billNoticeBool.value = false
            }
            if(key === 'notice'){
                billNoticeBool.value = true
            }
        }

            return{
                // quickLink
                quickLinkList,
                quickLinkRender,
                NowRenderSection,
                handquickLinkStatus,
                contentBg,
                // scrollEl (phone)
                scrollEl,
                // Login
                LoginStep,
                handNextLogin,
                // 導覽列 (index-nav)   
                navIconImg,                 
                NavIcon,
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
                // detail
                backBtnBool,
                detailCont,
                // detail - 多門號切換繳款與帳單明細
                    // nav
                billNavIs,
                handbillNav,       
                nearlyBillData, 
                handnearlyBillItem,    
                payRecordData,
                handpayRecordItem,
                    // notice
                billNoticeBool,
                handbillNoticeBool,                
                // herf router
                handHrefCont,
                
            }   
            
        },

    }
    createApp(App).mount("#app")     

}


