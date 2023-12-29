window.onload = () =>{

    const {createApp, ref, reactive, computed, watch, onMounted , onUpdated} = Vue
    const App = {

        setup(){
        // loading
        const loading = ref(true)
        const handLoading = () =>{
            loading.value = true
            let timer = null
            timer = setTimeout(()=>{
                loading.value = false
                clearTimeout(timer)
            },500)
           

        }
        handLoading()
        // 初始資料
        const NowRenderSection = ref('login')
        const contentBg = ref('./img/ContBg/UserlogIn.png')       
        const restartData = () =>{
            NoticeIs.value = 'none'
            NowRenderSection.value = 'login'
            contentBg.value = './img/ContBg/UserlogIn.png'
            LoginStep.value = 0
            navIconImg.value = './img/navIcon/01.png'
            NavIcon.data.forEach(item=>{
                item.act = false
                if(item.idx === 0) item.act = true
            })     
            scrollEl.value.scrollTop = 0      
            settingNavIs.value = '基本管理'
        }
        // quickLink
        const quickLinkData = reactive(
            {data:[
            {key:'login',link:['登入狀態',]},
            {key:'index_home',link:['帳單',"手機裝置"]},
            {key:'index_service',link:['',]},
            {key:'index_discount',link:['',]},
            {key:'index_setting',link:['帳單',]},
            {key:'detail_帳單明細',link:['帳單',]},
            // {key:'detail_帳單明細',link:['小額代收明細','通話帳單明細']},
            {key:'detail_會員資料設定',link:['帳單類型',]},
            {key:'detail_門號設定',link:[]},
            // {key:'detail_原台灣之星VoLTE服務',link:['有無支援volte']},
            {key:'會員資料設定_帳單類型設定',link:['帳單類型',]},
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
            {idx:4 ,search:'帳單類型', title: '帳單類型' ,        statusFn:'帳單類型轉換' , statusIs:'紙本帳單',
            arr:[{statusKey:'紙本帳單',msg:'紙本帳單'},{statusKey:'電子帳單_待驗證',msg:'電子帳單(待驗證)'},{statusKey:'電子帳單_已驗證',msg:'電子帳單(已驗證)'}]},            
            {idx:5 ,search:'還原門號設定', title: '還原門號設定' ,        statusFn:'還原門號設定' , statusIs:'none',
            arr:[{statusKey:'還原',msg:'還原'}]},            
            // {idx:6 ,search:'有無支援volte', title: '手機型號支援' , statusFn:'有無支援volte' , statusIs:'無',
            // arr:[{statusKey:'無',msg:'無'},{statusKey:'有',msg:'有'}]},            
            // {idx:6 ,search:'', title: '' ,        statusFn:'' , statusIs:'',
            // arr:[{statusKey:'',msg:''},{statusKey:'',msg:''}]},            
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
            if(key === '會員資料設定'){
                InnerLinkdata.data.forEach(item=>{
                    if(detailCont.value[0] === item.key){
                        key = `會員資料設定_${item.key}`
                    }
                })                  
            }
            return key
        }
        const quickLinkRender = computed(()=>{
            let key = NowRenderSection.value
            key =  quickLinkContIs(key)
            console.log('quickLink的區域為:',key);

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
            if(statusFn === '帳單類型轉換'){
                handbillType(key)
            }
            if(statusFn === '還原門號設定'){
                resetPhoneSetttingListStatus()
            }
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
                {idx:1 ,type: 'serviceManagement',msg:'Google Play', dcb:'DCB_google'},
                {idx:2 ,type: 'serviceManagement',msg:'小額付款', dcb:'DCB小額'},
                {idx:3 ,type: 'serviceManagement',msg:'更多設定', dcb:'moresetting'},
            ]})

            const packageSettingList =  (arr) =>{
                let Newarr = []
                Newarr = arr.map(item=>{
                    item.url = `./img/setting/list/${item.type}${item.idx}.png`
                    item.key = `${item.type}_${item.idx}`
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
                return data

            })
        //href Control
            const detailCont = ref(['key','headerName'])
            const detailHeaderBg = ref('')
            const backBtnIs = ref({key:'index' ,show: true})
            const OuterLinkdata = reactive({data:[
                {txt:'',        key:'',         url:''},
                {txt:'',        key:'billcard',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/payment-auth_b.php?attest_to=creditcardPayment'},
                {txt:'',        key:'billatm',         url:'https://ow.tstarcs.taiwanmobile.com/TWM/payment-auth_b.php?attest_to=depositPayment'},
                {txt:'',        key:'外網設定密碼',         url:'https://member.taiwanmobile.com/MemberCenter/changePassword/begin.do'},
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
            const noticeLinkData = reactive({data:[
                {key:'變更電子帳單信箱_notice'}
            ]})
            const InnerLinkdata = reactive({data:[
                {backBtn:'',                  key:'', headerTxt:'',              contentBg:''},
                {backBtn:'原台灣之星VoLTE服務',key:'voltehomepage', headerTxt:'',              contentBg:'./img/ContBg/2b_gray.png'},
                {backBtn:'代收服務',           key:'serviceManagement_1', headerTxt:'',              contentBg:'./img/ContBg/2b_gray.png'},
                {backBtn:'代收服務',           key:'serviceManagement_2', headerTxt:'',              contentBg:'./img/ContBg/2b_gray.png'},
                {backBtn:'index',           key:'serviceManagement_3', headerTxt:'電信帳單代收',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'index',             key:'原台灣之星VoLTE服務', headerTxt:'VoLTE服務',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'index',             key:'電子帳單設定', headerTxt:'變更電子帳單信箱',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'index',             key:'門號設定', headerTxt:'門號設定',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'index',             key:'會員資料設定', headerTxt:'會員資料設定',              contentBg:'./img/ContBg/gray.png'},
                {backBtn:'會員資料設定',       key:'變更電子帳單信箱', headerTxt:'變更電子帳單信箱',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'會員資料設定',       key:'帳單類型設定', headerTxt:'帳單類型設定',              contentBg:'./img/ContBg/gray.png'},
                {backBtn:'會員資料設定',       key:'帳單地址設定', headerTxt:'帳單地址設定',              contentBg:'./img/ContBg/lavender.png'},
                {backBtn:'會員資料設定',       key:'電子帳單申請', headerTxt:'電子帳單申請',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'會員資料設定',       key:'版本說明', headerTxt:'版本說明',              contentBg:'./img/ContBg/fa_gray.png'},
                {backBtn:'會員資料設定',       key:'變更暱稱', headerTxt:'變更暱稱',              contentBg:'./img/ContBg/gray.png'},
                {backBtn:'index',             key:'et3', headerTxt:'Tinder 交友平台',              contentBg:'./img/ContBg/black.png'},
                {backBtn:'index',             key:'et2', headerTxt:'MyVideo',              contentBg:'./img/ContBg/black.png'},
                {backBtn:'index',             key:'訊息中心', headerTxt:'訊息中心',              contentBg:'./img/ContBg/gray.png'},
                {backBtn:'index',             key:'帳單明細', headerTxt:'多門號切換繳款與帳單明細',contentBg:'./img/ContBg/gray.png'},
                {backBtn:'index',             key:'合約方案', headerTxt:'合約方案',              contentBg:'./img/ContBg/black.png'},
                {backBtn:'index',             key:'billshop', headerTxt:'超商繳費條碼',              contentBg:'./img/ContBg/gray.png'},
                
            ]})
            const handOuterLink = (el, bool) =>{
                let key = el.currentTarget.dataset.href
                console.log('bool',bool);
                OuterLinkdata.data.forEach(item=>{
                    if(item.key === key){
                        window.open(item.url, '_blank', 'height=1200, width=500');
                        return bool = true
                    }
                    return bool = false
                })                
            }

            const handHrefCont = (el) =>{
                let IsInnerLink = false
                let IsOuterLink = false
                let isNoticeLink = false
                let key = el.currentTarget.dataset.href
                noticeLinkData.data.forEach(item=>{
                    if(item.key === key){
                        handNoticeIs(el)
                        isNoticeLink = true
                    }
                })
                console.log('href:',key);
                if(isNoticeLink) return
                if(key === 'null') return
                
               
                if( key === 'login'){
                    restartData()
                    return
                }
                if(key === 'index'){
                    NowRenderSection.value = 'index'
                    contentBg.value = './img/ContBg/index.png'

      
                    if(NoticeIs.value === '門號設定變更成功'){
                        quickLinkData.data.forEach(item=>{
                            if(item.key === 'detail_門號設定' && item.link.length === 0) item.link.push('還原門號設定')
                        })          
                    }
                    resetPhoneSetttingList()
                    NoticeIs.value = 'none'   
                    phoneSetttingNoticeBool.value = false          
                    return
                }
                
                InnerLinkdata.data.forEach(item=>{
                    if(key === item.key){
                        NowRenderSection.value = 'detail'
                        detailCont.value[0] = item.key
                        detailHeaderBg.value = `background-color: #000;`

                        if(key === 'voltehomepage'){
                            NowRenderSection.value = 'volte'
                            handlinkToVolteNav(el)
                            console.log('成功跳轉至volte頁面');
                        }

                        if(item.backBtn === '代收服務'){
                            NowRenderSection.value = 'DCBservice'
                            handlinkToDCBNav(el)
                            console.log('成功跳轉至DCB頁面');
                            backBtnIs.value.key = 'index'
                        }
                        
                        
                        if(detailCont.value[0] === 'et2'){
                            detailCont.value[0] = '加值服務申辦內容'
                            detailHeaderBg.value = `background-color: transparent;`
                            serviceItemIs.value = 'MyVideo'
                        }
                        if(detailCont.value[0] === 'et3'){
                            detailCont.value[0] = '加值服務申辦內容'
                            detailHeaderBg.value = `background-color: transparent;`
                            serviceItemIs.value = 'Tinder'
                        }
                        detailCont.value[1] = item.headerTxt
                        contentBg.value = item.contentBg
                        scrollEl.value.scrollTop = 0
                        IsInnerLink = true

                        if(detailCont.value[1] ===  '帳單地址設定'){
                            AddressCity.value = nowAddressResult.is[0].val
                            AddressRegion.value = nowAddressResult.is[1].val
                            AddressDetail.value = nowAddressResult.is[2].val
                            setTimeout(()=>{
                                detailAddressAutoHeight()
                            },50)
                        }
                        backBtnIs.value.key = item.backBtn
                        nicknameInputAlert.value = false
                    }
                })
                NoticeIs.value = 'none'
                
                if(!IsInnerLink){
                    IsOuterLink = handOuterLink(el,IsOuterLink)    
                    console.log('調用外網功能',IsOuterLink);
                    if(!IsOuterLink){
                        console.warn('尚未指定ineerhref');  
                    }
                    return
                }
                
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
        // detail - serviceDetailBox
        const serviceItemIs = ref()
        const serviceItemData = reactive({data:[
            {id:'MyVideo', banner:'./img/detail/demo_myvideo.png' ,mgTop:'15rem', applyTitle:'MyVideo 優惠方案',
            selected:'加值型',
            card:[
                {bool: true, key:'加值型' ,txt:'加值型' ,promotion: '首月免費',price:'$250/月',msg:[
                 {idx:1, cont:'本服務無須綁約'},
                 {idx:2, cont:'首次申裝享前30天免月租費'},
                 {idx:3, cont:'享穎是電影/Discovery專區無限看'},
                ]},
                {bool: false, key:'12m綁約型' ,txt:'12M綁約型' ,promotion: '',price:'$149/月',msg:[
                 {idx:1, cont:'本優惠方案須綁約12個月'},
                 {idx:2, cont:'享穎是電影/Discovery專區無限看'},
                ]},
            ]},
            {id:'Tinder', banner:'./img/detail/demo_tinder.png' ,mgTop:'15rem', applyTitle:'Tinder 交友平台 優惠方案',
            selected:'tinder_plus_1m型',
            card:[
                {bool: true, key:'tinder_plus_1m型',txt:'Tinder Plus_1M型',promotion: '',price:'$470/月',msg:[
                    {idx:1, cont:'活動期間首次申辦再享9折優惠'},
                    {idx:2, cont:'本服務無須綁約'},
                    {idx:3, cont:'享無限按讚、倒回、配對提升工具'},
                    ]},
                {bool: false, key:'tinder_gold_1m型',txt:'Tinder Gold_1M型' ,promotion: '',price:'$765/月',msg:[
                    {idx:1, cont:'活動期間首次申辦再享9折優惠'},
                    {idx:2, cont:'本服務無須綁約'},
                    {idx:3, cont:'Plus功能再升級，快速脫單首選'},
                   ]},
                {bool: false, key:'tinder_plus_6m型' ,txt:'Tinder Plus_6M型' ,promotion: '',price:'$1817/6個月',msg:[
                    {idx:1, cont:'活動期間首次申辦再享9折優惠'},
                    {idx:2, cont:'本優惠方案須一次繳付6個月費用'},
                    {idx:3, cont:'享無限按讚、倒回、配對提升工具'},
                   ]},
                {bool: false, key:'tinder_gold_6m型' ,txt:'Tinder Gold_6M型' ,promotion: '',price:'$2754/6個月',msg:[
                    {idx:1, cont:'活動期間首次申辦再享9折優惠'},
                    {idx:2, cont:'本優惠方案須一次繳付6個月費用'},
                    {idx:3, cont:'Plus功能再升級，快速脫單首選'},
                   ]},                   
            ]},
        ]})
        const serviceItemDataRender = computed(()=>{
            let key = serviceItemIs.value 
            let result = serviceItemData.data.filter(item=>{
                if(item.id === key) return item               
            })
            result[0].card.forEach(item=>{
                if(item.bool) nextWantApplyIs.value =  item.txt
            })
            return result
        })
        const nextWantApplyIs = ref('')
        const handserviceItemBool = (el) =>{
            let key = el.currentTarget.dataset.cardkey
            let id = el.currentTarget.dataset.id

            let selectArr = []
            selectArr = serviceItemData.data.filter(item=>{
                if(item.id  === id) return item
            })
            // console.log('選到的資料:',selectArr);
            selectArr[0].card.forEach(item=>{
                item.bool = false
                if(item.key === key) item.bool = true
            })
        }
        // detail - 會員資料設定
        const memberSettingData = reactive({data:[
            {type:'', title:'', txt:'', hasEdit: false,editKey:'', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'會員資料', title:'姓名', txt:'宋*雯', hasEdit: false,editKey:'', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'會員資料', title:'登入門號', txt:'09088***55', hasEdit: false,editKey:'', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'會員資料', title:'暱稱', txt:'未設定', hasEdit: true, editKey:'變更暱稱', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'會員資料', title:'密碼設定', txt:'', hasEdit: true, editKey:'外網設定密碼', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'帳單類型',     billType:'紙本帳單' , txt:'紙本帳單', hasEdit: true,editKey:'帳單類型設定', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'帳單寄送地址',  billType:'紙本帳單'  , txt:'紙本帳單地址', hasEdit: true,editKey:'帳單地址設定', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'電子帳單',     billType:'紙本帳單' , txt:'電子帳單申請', hasEdit: false,editKey:'電子帳單申請', blueTxt:true, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'帳單類型',     billType:'電子帳單_待驗證' , txt:'電子信箱待驗證', hasEdit: true,editKey:'帳單類型設定', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'電子帳單',     billType:'電子帳單_待驗證' , txt:'*t*t*8*@gmail.com', hasEdit: true,editKey:'變更電子帳單信箱_notice', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'帳單類型',     billType:'電子帳單_已驗證' , txt:'電子帳單', hasEdit: false,editKey:'', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'資訊帳單', title:'電子帳單',     billType:'電子帳單_已驗證' , txt:'*t*t*8*@gmail.com', hasEdit: true,editKey:'變更電子帳單信箱', blueTxt:false, hasOrgBool:false ,active: false},
            {type:'更多設定', title:'保持登入', txt:'', hasEdit: false,  editKey:'keeplogin', hasOrgBool:true ,active: true, },
            {type:'更多設定', title:'接收推播', txt:'', hasEdit: false,  editKey:'接收推播', hasOrgBool:true ,active: false, },
            {type:'更多設定', title:'APP 版本號碼', txt:'7.0.0', hasEdit: false,editKey:'版本說明', hasOrgBool:false ,active: false, },
        ]})
        const packageMemberSetting = (key) =>{
            
            let result = memberSettingData.data.filter(item=>{
                if(item.type === key) return item
            })
            return result
        }
        const memberInfoListRender = computed(()=>{
           let data =  packageMemberSetting('會員資料')
           return data
        })
        const billInfoListRender = computed(()=>{
            let data =  packageMemberSetting('資訊帳單')

            data = data.filter(item=>{
                if(item.billType === billType.value) return item
            })

            data.forEach(item=>{
                if(item.title === '帳單寄送地址'){
                    item.txt = `${nowAddressResult.is[0].val}${nowAddressResult.is[1].val}******`
                }
            })
            AddressDetail.value = nowAddressResult.is[2].val
            return data
        })
        const memberMoreSetListRender = computed(()=>{
            let data =  packageMemberSetting('更多設定')
            return data
        })
        const handMemberSettingBool = (el) =>{
            let key = el.currentTarget.dataset.key
            // console.log(key);

            
            if(key === 'keeplogin'){
                memberMoreSetListRender.value.forEach(item=>{
                    if(item.editKey === key){
                        item.active = !item.active
                    }
                })
            }
            if(key === '接收推播'){
                handNoticeIs(el)
                memberMoreSetListRender.value.forEach(item=>{
                    if(item.editKey === key){
                        item.active = !item.active
                    }
                })
            }

        }
        const backToMemberSetting = () =>{
            backBtnIs.value.key = 'index'
            NowRenderSection.value = 'detail'
            detailCont.value[0] = '會員資料設定'
            detailCont.value[1] = '會員資料設定'
        }

        // detail - 會員資料設定 - 暱稱
        const nicknameInput = ref('')
        const nicknameInputAlert = ref(false)
        const updateNickname = () =>{
            if(nicknameInput.value === '') return nicknameInputAlert.value = true
            memberSettingData.data.forEach(item=>{
                if(item.title === '暱稱') {
                    item.txt  = nicknameInput.value
                    nicknameInput.value = ''
                    nicknameInputAlert.value = false
                    backToMemberSetting()
                }
            })

        }
        // detail - 會員資料設定 - Address
        const AddressData = reactive({data:[]})
        const AddressCity = ref("")
        const AddressRegion = ref("")
        const AddressDetail = ref("")
        const nowAddressResult = reactive({is:[
            {key:"city", val:'新北市'},
            {key:"region", val:'三重區'},
            {key:"detail", val:'重新路五段609巷2號10樓'},
        ]})
        const noticeAddressList = reactive({is:[],key:''})
        const noticeEl = ref([])
        const cityscroll = ref(null)
        const regionscroll = ref(null)
        const AddressListRender = computed(()=>{
            
            let data = noticeAddressList.is
            let key = noticeAddressList.key
            
           
            setTimeout(()=>{
                // console.log('addressListElement',noticeEl.value);
                if(key === '顯示地區資料'){
                    noticeEl.value.forEach(item=>{
                        if(item.classList.contains('active')) regionscroll.value.scrollTop = item.offsetTop
                    })
                }   
                if(key === '顯示縣市資料'){
                    noticeEl.value.forEach(item=>{
                        if(item.classList.contains('active')) cityscroll.value.scrollTop = item.offsetTop
                    })
                }   
                noticeEl.value = []
            },1)
            return noticeAddressList
        })


        const handAddressListRender = (el)=>{
            let data = AddressData.data
            let key = el.currentTarget.dataset.key
            handNoticeIs(el)

            if(key === '顯示縣市資料'){
                data = data.map(item=>{
                    if(item.city === AddressCity.value){
                        item.act = true
                    }else{
                        item.act  = false
                    }
                    return item
                } )
                noticeAddressList.is = data
                noticeAddressList.key = key
                
            }
            if(key === '顯示地區資料'){
                data = data.map(item=>{
                    if(item.city === AddressCity.value){
                        item.act = true
                    }else{
                        item.act  = false
                    }
                    return item
                } )                
                data = data.filter(item => item.act);
                data[0].region = data[0].region.map(item=>{
                    if(item.key === AddressRegion.value){
                        item.act = true
                    }else{
                        item.act  = false
                    }
                    return item
                } )   
                noticeAddressList.is = data[0].region
                noticeAddressList.key = key                             
            }
        }
        const changeAddressFn = (el) =>{
            let key = el.currentTarget.dataset.notice
            if(key === '變更地區資料'){
                let val = el.currentTarget.dataset.key
                noticeAddressList.is = noticeAddressList.is.map(item=>{
                    if(item.key === val){
                        AddressRegion.value = val
                        item.act = true
                    }else{
                        item.act  = false
                    }
                    return item
                } )
                noticeAddressList.is = []
                noticeAddressList.key = ''                
            }            
            if(key === '變更縣市資料'){
                let val = el.currentTarget.dataset.key
                let nochange = false
                noticeAddressList.is = noticeAddressList.is.map(item=>{
                    if(item.city === val){
                        AddressCity.value = val
                        if(item.act){
                            nochange = true
                        }                        
                        item.act = true
                    }else{
                        item.act  = false
                    }
                    return item
                } )
                if(!nochange) {
                    let defaultRegion = noticeAddressList.is.filter(item=>{
                        if(item.act) return item
                    })
                    AddressRegion.value = defaultRegion[0].region[0].key

                }
                noticeAddressList.is = []
                noticeAddressList.key = ''
            } 
            NoticeIs.value = 'none'           
        }

        const handnowAddressResult = () =>{
            nowAddressResult.is[0].val = AddressCity.value
            nowAddressResult.is[1].val = AddressRegion.value
            nowAddressResult.is[2].val = AddressDetail.value
            backToMemberSetting()
        }
        const remindTxtmgTop = ref(0)
        const detailAddress = ref("null")
        const detailAddressAutoHeight = () =>{
            if(detailAddress.value !== null){
                let height = detailAddress.value.scrollHeight
                let row = 0
                row = Math.floor( (height - 12) / 26) 
                detailAddress.value.style.height = `${12 + row * 26}px` 
                remindTxtmgTop.value = `margin-top:${(row -1) * 26}px;`
                AddressDetail.value = detailAddress.value.value
            }
            if(detailAddress.value.value === ''){
                row = 1
                detailAddress.value.style.height = `${12 + row * 26}px` 
                remindTxtmgTop.value = `margin-top:${(row -1) * 26}px;`
            }
        }
         // detail - 會員資料設定 - 帳單類型
         const billType = ref('紙本帳單')
         const handbillType = (key) =>{
            billType.value = key
            backToMemberSetting()
         }
        //  datail- 門號設定
        const phoneSetttingList = reactive({data:[
            {show:true ,idx:0, key:'來話顯示(語音/影像)', act:false,},
            {show:true ,idx:1, key:'話中插接語音電話', act:false,},
            {show:true ,idx:2, key:'去化保密(語音/影像)', act:true,},
            {show:true ,idx:3, key:'限制撥打(語音/影像)', act:false,},
            {show:true ,idx:4, key:'指定轉接語音電話', act:false,},
            {show:true ,idx:5, key:'簡訊_限發簡訊', act:false,},
            {show:true ,idx:6, key:'限制接受語音/影像電話', act:false,},
            {show:true ,idx:7, key:'限播交友類簡碼加值', act:true,},
            {show:true ,idx:8, key:'簡訊_限收簡訊', act:false,},
            {show:true ,idx:9, key:'IDD_限撥國際發話', act:false,},
            {show:true ,idx:10, key:'指定轉接影像電話', act:false,},
            {show:true ,idx:11, key:'020/050付費語音資訊', act:false,},
            {show:true ,idx:12, key:'國際漫遊不發話_語音影像簡訊', act:false,},
            {show:true ,idx:13, key:'拒接國際來電', act:false,},
            {show:true ,idx:14, key:'國際漫遊不受話_語音影像簡訊', act:false,},
        ]})
        const phoneSetttingList_modify = reactive({data:[
            {show:true ,idx:0, key:'來話顯示(語音/影像)', act:false,},
            {show:true ,idx:1, key:'話中插接語音電話', act:false,},
            {show:true ,idx:2, key:'去化保密(語音/影像)', act:true,},
            {show:true ,idx:3, key:'限制撥打(語音/影像)', act:false,},
            {show:true ,idx:4, key:'指定轉接語音電話', act:false,},
            {show:true ,idx:5, key:'簡訊_限發簡訊', act:false,},
            {show:true ,idx:6, key:'限制接受語音/影像電話', act:false,},
            {show:true ,idx:7, key:'限播交友類簡碼加值', act:true,},
            {show:true ,idx:8, key:'簡訊_限收簡訊', act:false,},
            {show:true ,idx:9, key:'IDD_限撥國際發話', act:false,},
            {show:true ,idx:10, key:'指定轉接影像電話', act:false,},
            {show:true ,idx:11, key:'020/050付費語音資訊', act:false,},
            {show:true ,idx:12, key:'國際漫遊不發話_語音影像簡訊', act:false,},
            {show:true ,idx:13, key:'拒接國際來電', act:false,},
            {show:true ,idx:14, key:'國際漫遊不受話_語音影像簡訊', act:false,},
        ]})
        const handphoneSetttingBool = (el) =>{
            let key = el.currentTarget.dataset.key
            phoneSetttingList_modify.data.forEach(item=>{
                if(item.key === key){
                    item.act = !item.act
                }
                
            })
     
        }
        const phoneSetttingNoticeBool = ref(false)
        const handphoneSetttingNoticeBool = (el) =>{
            phoneSetttingNoticeBool.value = !phoneSetttingNoticeBool.value
            if(phoneSetttingNoticeBool.value)  handNoticeIs(el)
        }
        const resetPhoneSetttingList = () =>{
            let idx = 0
            phoneSetttingList.data.forEach(item=>{
                phoneSetttingList_modify.data[idx].act = item.act
                idx++
            })
        }
        const resetPhoneSetttingListStatus = () =>{
            // 有選擇過 才有這情境調整
            quickLinkData.data.forEach(item=>{
                if(item.key === 'detail_門號設定') item.link = []
                
            })
            quickLinkList.data.forEach(item=>{
                if(item.idx === 5){
                    item.statusIs = 'none'
                }
            })
            phoneSetttingList_modify.data.forEach(item=>{
                if(!item.show){
                    item.show = true
                }
            })
            resetPhoneSetttingList()
        }
        const phonechangeItem = ref([])
        const handphoneSetttingStatus = () =>{
            phonechangeItem.value = []
            let count = 0
            let idx = 0
            if(!phoneSetttingNoticeBool.value){
                NoticeIs.value = '門號設定未勾選注意事項'
                return
            }
            phoneSetttingList_modify.data.forEach(item=>{
                if(item.act === true && phoneSetttingList.data[idx].act === false) {
                    count++
                    phonechangeItem.value.push(item.key)
                    item.show = false
                }
                if(item.act === false && phoneSetttingList.data[idx].act === true) {
                    count++
                    phonechangeItem.value.push(item.key)
                    item.show = false
                }
                idx++
            })

            if(count === 0) {
                NoticeIs.value = '門號設定無變更'
            }else{
                NoticeIs.value = '門號設定變更成功'
                phoneSetttingNoticeBool.value = false
             
            }
            
        }

        


        // notice整合
        const noticeData = reactive({data:[
            {where:'none', key:'none', },
            {where:'volte-注意事項', key:'volte-注意事項', },
            {where:'門號設定-注意事項', key:'門號設定-注意事項', },
            {where:'帳單-注意事項', key:'帳單-注意事項', },
            {where:'會員設定-帳號登出', key:'帳號登出', },
            {where:'會員設定-接收推播', key:'接收推播', },
            {where:'會員設定-帳單類型', key:'帳單類型更換', },
            {where:'紙本帳單-顯示縣市資料', key:'顯示縣市資料', },
            {where:'紙本帳單-顯示地區資料', key:'顯示地區資料', },
            {where:'變更電子帳單信箱', key:'變更電子帳單信箱_notice', },
        ]})
        const NoticeIs = ref('none')
        const handNoticeIs = (el) =>{
            let key = el.currentTarget.dataset.key
            // console.log('noticeKey',key);
            noticeData.data.forEach(item=>{
                if(item.key === key){
                    NoticeIs.value = key
                }
            })
        }       
        const NoticeDemoPos = reactive({data:[
            {key:'volte-注意事項',BtnPosY: `bottom: 3.2rem;`},
            {key:'帳單-注意事項',BtnPosY: `bottom: 3.2rem;`},
            {key:'門號設定-注意事項',BtnPosY: `bottom: 14rem;`},
            {key:'門號設定未勾選注意事項',BtnPosY: `bottom: 20rem;`},
        ]})  
        const NoticeDemoBtnPos = computed(()=>{
            let BtnPosY = ''
            NoticeDemoPos.data.forEach(item=>{
                if(item.key === NoticeIs.value){
                    BtnPosY = item.BtnPosY
                }
            })
            return BtnPosY
        })

        // Volte Page
        const VolteNav = reactive({Is:[
            {key:'服務說明'},
            {key:'啟用教學'},
            {key:'支援手機'},
        ]})
        const VolteContIs =  ref('')
        const handlinkToVolteNav = (el) =>{
            let key = el.currentTarget.dataset.volte
            VolteNav.Is.forEach(item=>{
                if(item.key === key) VolteContIs.value = key
            })
            VolteContBool.value = false
            scrollEl.value.scrollTop = 0      
            console.log('volte顯示的內容是:',VolteContIs.value);
        }
        const VolteContBool = ref(false)
        

        const handVolteContBool = (el) =>{
            VolteContBool.value = !VolteContBool.value
        }
        // DCB Page
        const DCBNav = reactive({Is:[
            {key:'DCB首頁'},
            {key:'DCB_google'},
            {key:'DCB_apple'},
            {key:'DCB小額'},
        ]})
        const DCBContIs =  ref('')
        const handlinkToDCBNav = (el) =>{
            let key = el.currentTarget.dataset.dcb
            DCBNav.Is.forEach(item=>{
                if(item.key === key) DCBContIs.value = key
            })
            DCBContBool.value = false
            scrollEl.value.scrollTop = 0      
            console.log('DCB顯示的內容是:',DCBContIs.value);
        }
        const DCBContBool = ref(false)
        

        const handDCBContBool = (el) =>{
            DCBContBool.value = !DCBContBool.value
        }


        onMounted(()=>{
            // console.log('test',noticeEl.value)
            axios.get("./api/taiwanAddress.json")
            .then(res=>{
                AddressData.data = res.data.data
            })
            .catch(err=>{
                console.error('沒接到API');
            })
        })

        

            return{
                // loading
                loading,
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
                backBtnIs,
                detailCont,
                detailHeaderBg,
                // detail - 多門號切換繳款與帳單明細
                    // nav
                billNavIs,
                handbillNav,       
                nearlyBillData, 
                handnearlyBillItem,    
                payRecordData,
                handpayRecordItem,
                // datail- 門號設定
                
                // notice整合
                NoticeIs,
                handNoticeIs,
                billNoticeBool,
                handbillNoticeBool,       
                NoticeDemoBtnPos,         
                // herf router
                handHrefCont,
                // detail - serviceDetailBox
                serviceItemIs,
                serviceItemDataRender,
                handserviceItemBool,
                nextWantApplyIs,
                // detail - 會員資料設定
                memberInfoListRender,
                billInfoListRender,
                memberMoreSetListRender,
                handMemberSettingBool,
                    // 暱稱
                nicknameInput,
                nicknameInputAlert,
                updateNickname,
                // 地址
                AddressCity,
                AddressRegion,
                AddressDetail,
                detailAddress,
                detailAddressAutoHeight,
                remindTxtmgTop,
                nowAddressResult,
                AddressListRender,
                noticeEl,
                handAddressListRender,
                changeAddressFn,
                handnowAddressResult,
                cityscroll,
                regionscroll,
                // 帳單類型
                billType,
                // 門號設定
                phoneSetttingList_modify,
                phoneSetttingNoticeBool,
                handphoneSetttingNoticeBool,
                handphoneSetttingBool,
                handphoneSetttingStatus,
                phonechangeItem,
                // volte
                VolteContIs,
                handlinkToVolteNav,
                VolteContBool,
                handVolteContBool,              
                // DCB
                DCBContIs,
                handlinkToDCBNav,
                DCBContBool,
                handDCBContBool,              
            }   
            
        },

    }
    createApp(App).mount("#app")     

}


