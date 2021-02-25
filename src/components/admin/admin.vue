<template>
    <div class="ge" style="height:100%;overflow: auto;">
        <div class="title" style="background: rgb(40, 184, 161);font-size: 20px;color: white;padding: 10px 0;text-align: center;">我的</div>
        <div class="nav"> 
            <div class="nav_item"  @click="changestate">医生</div>
            <div class="nav_item" @click="changehuan">用户</div>
            <div class="nav_item  nav_item1">管理员</div>
        </div>
        <div class="content">
            <div class="userssss"  style="padding-left: 10%; border-bottom:1px solid #ccc;">
                <!-- <img src="./../assets/avatar.png" alt="" width="50px;" style="vertical-align: top;margin-left:10px;" > -->
                 <img :src="headimgurl" alt="" width="50px;" style="vertical-align: middle;border-radius: 50%;margin-left:10px;" >
                <div class="user" style="display: inline-block;vertical-align: middle;margin-left:10px;"  >
                    <p><span>管理员姓名：</span><span>{{adminMaster.name}}</span></p>
                    <p><span>所属部门：</span><span>&nbsp;&nbsp;&nbsp;{{adminMaster.dept_name}}</span></p>
                    <p><span>管理职位：</span><span>&nbsp;&nbsp;&nbsp;{{adminMaster.job}}</span></p>
                    <p><span>管理职称：</span><span>&nbsp;&nbsp;&nbsp;{{adminMaster.title}}</span></p>
                </div>
              </div>
            <div class="content2">
                  <p @click="godoctormanagement" v-if="permission==2">
                      <span><svg t="1574475874662" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4139" width="24" height="24"><path d="M512.096 640a256 256 0 0 1-254.272-226.88c-38.624-21.952-33.6-29.12-33.6-61.12 0-32 6.752-64 13.696-87.36C280.064 122.656 373.344 64 512.096 64 713.504 64 800 179.84 800 352c0 26.368-12.8 42.784-32.64 50.112A255.968 255.968 0 0 1 512.128 640zM296.64 353.28h23.584V384A191.968 191.968 0 1 0 704 384c0-24.704 12.608-34.912 31.936-39.904C733.632 208.672 670.368 128 512.096 128c-111.744 0-153.92 23.968-209.568 136.64-5.376 10.88-9.088 22.72-13.056 34.464-3.456 10.176-1.088 28.224 7.136 54.144z m247.488 378.688v36c0 3.744-0.64 7.36-1.824 10.72a48 48 0 1 1-60.352 0 31.936 31.936 0 0 1-1.824-10.72v-36a128.224 128.224 0 0 1-90.4-86.624 127.616 127.616 0 0 0-37.536 90.56v160h319.872v-32a32 32 0 1 1 64 0v64a32 32 0 0 1-32 32H320.192a32 32 0 0 1-32-32v-192c0-61.088 28.736-117.44 76.608-153.472a32 32 0 0 1 35.296-2.112A32 32 0 0 1 448.128 608a64 64 0 1 0 127.968 0 32 32 0 0 1 49.856-26.56 32 32 0 0 1 35.424 2.496 191.712 191.712 0 0 1 74.656 152v30.496a32 32 0 1 1-64 0v-30.528c0-34.56-13.76-66.88-37.504-90.56a128.224 128.224 0 0 1-90.432 86.624zM640.064 224c0 55.488 51.2 96 95.968 96a32 32 0 0 1 0 64c-48.768 0-99.68-26.08-130.624-69.056C563.2 360.64 485.28 384 388.16 384H256.224c-17.664 0-17.664-64 0-64h131.968c117.696 0 187.936-36.96 187.936-96a32 32 0 1 1 63.968 0z" fill="#00BBBB" p-id="4140"></path></svg></span>
                      <span>医生管理</span>
                      <span style="position: absolute;right: 7%;top: 20px;"><svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg></span>
                  </p>
                  <p @click="goadministrativemanagement" v-if="permission==2">
                      <span><svg t="1574475954051" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1475" width="24" height="24"><path d="M844.8 665.6c-15.36 0-25.6 10.24-25.6 25.6v204.8h-614.4v-204.8c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v204.8c0 28.16 23.04 51.2 51.2 51.2h614.4c28.16 0 51.2-23.04 51.2-51.2v-204.8c0-15.36-10.24-25.6-25.6-25.6zM742.4 358.4h-460.8c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h460.8c12.8 0 25.6-12.8 25.6-25.6s-12.8-25.6-25.6-25.6z" p-id="1476" fill="#00BBBB"></path><path d="M512 665.6c-12.8 0-25.6 12.8-25.6 25.6v51.2h-51.2c-12.8 0-25.6 12.8-25.6 25.6s12.8 25.6 25.6 25.6h51.2v51.2c0 12.8 12.8 25.6 25.6 25.6s25.6-12.8 25.6-25.6v-51.2h51.2c12.8 0 25.6-12.8 25.6-25.6s-12.8-25.6-25.6-25.6h-51.2v-51.2c0-12.8-12.8-25.6-25.6-25.6zM944.64 460.8l-94.72-366.08c-2.56-10.24-12.8-17.92-25.6-17.92h-627.2c-12.8 0-23.04 7.68-25.6 17.92L76.8 460.8c-2.56 7.68-2.56 17.92-2.56 25.6 0 84.48 69.12 153.6 153.6 153.6 64 0 117.76-38.4 140.8-92.16 23.04 53.76 76.8 92.16 140.8 92.16s117.76-38.4 140.8-92.16c23.04 53.76 76.8 92.16 140.8 92.16 84.48 0 153.6-69.12 153.6-153.6 2.56-7.68 2.56-17.92 0-25.6z m-151.04 128c-40.96 0-76.8-23.04-94.72-61.44-7.68-17.92-25.6-30.72-46.08-30.72s-38.4 12.8-46.08 30.72c-15.36 38.4-53.76 61.44-94.72 61.44s-76.8-23.04-94.72-61.44c-7.68-17.92-25.6-30.72-46.08-30.72s-38.4 12.8-46.08 30.72c-15.36 38.4-53.76 61.44-94.72 61.44-56.32 0-102.4-46.08-102.4-102.4v-15.36l89.6-343.04h586.24l89.6 343.04v15.36c2.56 56.32-43.52 102.4-99.84 102.4z" p-id="1477" fill="#00BBBB"></path></svg></span>
                      <span>科室管理</span>
                      <span style="position: absolute;right: 7%;top: 20px;"><svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg></span>
                  </p>
                  <p @click="goauthoritymanagement" v-if="permission==2"> 
                      <span>
                          <svg t="1574476009190" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2393" width="24" height="24"><path d="M796.1 370.11h72.56a15.5 15.5 0 0 0 15.5-15.5V214.42a5.25 5.25 0 0 0-1.54-3.75c-13-12.72-28.46-3.75-28.46 8.84v115.43a5.17 5.17 0 0 1-5.17 5.17H791a5.25 5.25 0 0 0-3.75 1.54c-12.71 12.95-3.74 28.46 8.85 28.46z" fill="#00BBBB" p-id="2394"></path><path d="M736.85 355.6m-15 0a15 15 0 1 0 30 0 15 15 0 1 0-30 0Z" fill="#00BBBB" p-id="2395"></path><path d="M391.16 38.11h-345v345a100 100 0 0 0 100 100h345v-345a100 100 0 0 0-100-100z m20 365h-265a20 20 0 0 1-20-20v-265h265a20 20 0 0 1 20 20zM552.16 138.11v345h345a100 100 0 0 0 100-100v-345h-345a100 100 0 0 0-100 100z m345 265h-265v-265a20 20 0 0 1 20-20h265v265a20 20 0 0 1-20 20zM46.16 641.11v345h345a100 100 0 0 0 100-100v-345h-345a100 100 0 0 0-100 100z m345 265h-265v-265a20 20 0 0 1 20-20h265v265a20 20 0 0 1-20 20zM897.16 541.11h-345v345a100 100 0 0 0 100 100h345v-345a100 100 0 0 0-100-100z m20 365h-265a20 20 0 0 1-20-20v-265h265a20 20 0 0 1 20 20z" fill="#00BBBB" p-id="2396"></path></svg>
                      </span>
                      <span>
                          患者权限管理
                      </span>
                      <span style="position: absolute;right: 7%;top: 20px;">
                          <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                      </span>
                  </p>
                  <p @click="goAdministrator" > 
                      <span>
                          <svg t="1574476172293" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3270" width="24" height="24"><path d="M671.744 64c-159.04 0-288 128.96-288 288 0 57.28 17.216 110.336 46.016 155.136l-347.776 347.776c-24 24-24 62.912 0 86.848 23.936 24 62.848 24 86.848 0l111.488-111.488 57.344 57.344c10.368 10.368 27.2 10.368 37.568 0 10.432-10.432 10.432-27.264 0-37.632l-57.344-57.344 90.368-90.368 57.344 57.344c10.368 10.368 27.2 10.368 37.632 0 10.368-10.432 10.368-27.264 0-37.632l-57.344-57.344 70.656-70.656C561.408 622.784 614.528 640 671.744 640c159.04 0 288-128.96 288-288S830.784 64 671.744 64zM671.744 448c-52.992 0-96-43.008-96-96S618.752 256 671.744 256s96 43.008 96 96S724.736 448 671.744 448z" p-id="3271" fill="#00BBBB"></path></svg>
                      </span>
                      <span>
                          我管理的医生
                      </span>
                      <span style="position:absolute;right: 7%;top: 20px;">
                          <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                      </span>
                  </p>
                  <p @click="goIncomestatements" v-if="permission==2"> 
                      <span>
                          <svg t="1574649853030" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5704" width="24" height="24"><path d="M624.347 81.887h-502.698v850.045h781.974v-584.406c0 0-266.764-265.639-279.276-265.639v0zM791.911 294.399h-111.709v-106.256l111.709 106.256zM847.769 878.807h-670.262v-743.792c0 0 446.787 0 446.843 0v212.512h223.422v531.28zM736.058 719.425h-502.698v-53.127h502.698v53.127zM400.928 400.655h-167.57v-53.127h167.566v53.127h0.001zM568.492 560.041h-335.131v-53.127h335.131v53.127z" p-id="5705" fill="#00BBBB"></path></svg>
                      </span>
                      <span >
                          医院挂号收入
                      </span>
                      <span style="position: absolute;right: 7%;top: 20px;">
                          <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                      </span>
                  </p>
                  <p>
                        <span>
                          <svg t="1565246307958" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6242" width="24" height="24"><path d="M513.851167 0c-19.307804 0-38.993942 2.5627-58.98556 7.542391-77.775711 19.330811-129.640671 72.384455-154.816484 156.203282-18.131902 60.385139-17.86349 122.122566-5.439826 183.57752 15.805661 78.161714 46.715275 122.623602 95.871825 182.128093 1.947908 2.353083 4.303547 4.633311 5.396369 7.459311 17.146445 44.23182-20.364838 113.466902-66.171345 129.351808-35.525031 12.318855-70.738192 25.641061-105.096267 40.389687-54.758702 23.509099-107.611676 50.235313-153.727496 86.421149-29.025614 22.779272-56.903446 47.185636-66.204577 82.281207-4.776464 17.993861-4.099042 37.317004-4.449256 56.071367-0.446076 24.258097 9.154144 45.816732 28.813441 62.113204 14.036695 11.645267 46.501823 30.460982 46.501823 30.460982l160.70622-0.306757 275.017983 0 287.75735 0 146.732155 0c0 0 81.821071-56.693828 76.979421-108.960129-0.329764-3.535376-0.089471-4.970743 0-8.521457 0.614792-24.339899-11.564743-47.339014-26.681479-67.244995-24.520119-32.293856-57.62049-56.163394-93.063719-77.640227-67.051994-40.642762-140.2877-69.826867-216.383916-93.142965-30.307603-9.27429-68.670137-27.978806-69.214631-55.838743-0.489533-24.862665 3.35899-47.670056 19.6708-67.89941 40.699001-50.480718 67.013649-109.877844 83.379141-175.003658 14.560738-57.970705 18.116564-116.374704 7.157666-175.398608-11.086714-59.706439-36.569283-110.276628-81.763554-146.352544C604.964422 15.060496 560.545991 0 513.851167 0L513.851167 0 513.851167 0zM513.851167 0" p-id="6243" fill="#00BBBB"></path><path d="M831.785749 179.197284l179.19984 0c7.070752 0 12.799441 5.731246 12.799441 12.804553l0 25.595047c0 7.070752-5.728689 12.796884-12.799441 12.796884L831.785749 230.393769c-7.068195 0-12.799441-5.726133-12.799441-12.796884l0-25.595047C818.98503 184.929808 824.717554 179.197284 831.785749 179.197284z" p-id="6244" fill="#00BBBB"></path><path d="M831.785749 332.798243l179.19984 0c7.070752 0 12.799441 5.726133 12.799441 12.796884l0 25.605272c0 7.070752-5.728689 12.796884-12.799441 12.796884L831.785749 383.997284c-7.068195 0-12.799441-5.726133-12.799441-12.796884l0-25.605272C818.98503 338.524375 824.717554 332.798243 831.785749 332.798243z" p-id="6245" fill="#00BBBB"></path><path d="M780.585429 486.400479l230.40016 0c7.070752 0 12.799441 5.726133 12.799441 12.796884l0 25.602716c0 7.065639-5.728689 12.796884-12.799441 12.796884l-230.40016 0c-7.070752 0-12.799441-5.731246-12.799441-12.796884l0-25.602716C767.785988 492.126612 773.514678 486.400479 780.585429 486.400479z" p-id="6246" fill="#00BBBB"></path><path d="M908.586228 640.002716l102.400639 0c7.070752 0 12.799441 5.726133 12.799441 12.796884l0 25.595047c0 7.073308-5.728689 12.804553-12.799441 12.804553l-102.400639 0c-7.070752 0-12.799441-5.731246-12.799441-12.804553l0-25.595047C895.785509 645.730127 901.515477 640.002716 908.586228 640.002716z" p-id="6247" fill="#00BBBB"></path></svg></span>
                        <span >工会福利</span>
                        <span style="width:55%; text-align: right;position: absolute;right: 7%;top: 20px;" @click="gomodal11">
                            <span class="text" style="width:50%; text-align: right;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;" v-if="adminMaster.welfare!=undefined">{{adminMaster.welfare}}</span> 
                            <span>
                                <svg t="1565075218960" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5912" width="20" height="20"><path d="M668.45184 512.03584l-475.17696 433.4592-0.22528 0.22528a39.69024 39.69024 0 0 0 0.22528 56.12032 40.192 40.192 0 0 0 56.64768 0l494.65344-451.31776a39.97184 39.97184 0 0 0 13.14816-8.69888 39.5264 39.5264 0 0 0 11.7248-29.184 39.54176 39.54176 0 0 0-11.6736-30.46912 39.936 39.936 0 0 0-13.29664-8.77056L249.85088 22.13888c-15.64672-15.54944-40.97024-15.54944-56.63232 0l-0.30208 0.29696a39.6288 39.6288 0 0 0 0.30208 56.04352l475.23328 433.55648z" p-id="5913" fill="#8a8a8a"></path></svg>
                            </span>
                        </span>
                    </p>
                    <Modal v-model="modal11" fullscreen title="工会福利"  @on-ok="updateFuli()">
                        <div>
                            <Input v-model="value8"  type="textarea" :autosize="{minRows: 8,maxRows: 8}" placeholder="个人简介"/>
                            <!-- <p class="numberV" style="text-align:right;width:100%">{{txtVal}}/300</p> -->
                        </div>
                    </Modal>
            </div>
        </div>
        <loading v-show="isshowloading" class="loading"></loading>
    </div>
</template>

<script>
import loading from "@/common/loading";
import http from '@/utils/http'
    export default {
        components: {
            loading
        },
        data() {
            return {
                deptCode:'',
                headimgurl:'',
                isshowloading:false,
                adminMaster:{},
                permission:'',
                modal11:false,
                 value8:'',
                //  txtVal:0,
            }
        },
        methods:{
            tomodify(){

            },
            //限制字数
            gomodal11(){
                this.modal11=true;
                var text = document.getElementsByClassName('text')[0]
                
               this.value8= text.innerHTML;
                // this.value8 = $('.text').html();
                // this.txtVal = this.value8.length;
            },
           //前往医生管理
            godoctormanagement(){
                this.$router.push('/doctormanagement');
            },
            goadministrativemanagement(){
                this.$router.push('/administrativemanagement');
            },
            goauthoritymanagement(){
                this.$router.push('/authoritymanagement');
            },
            //账单
            goIncomestatements(){
                this.$router.push(`/Incomestatements`);
            },
            //管理员
            goAdministrator(){
                this.$router.push(`/myDoctor`);
            },
            //切换患者身份
            changehuan(){
                this.$router.push('/HomePage');
            },
            //修改员工福利
            async updateFuli(){
                var that = this;
                var url = '/admin/updateWelfare';
                var data = {
                    welfare:this.value8
                }
                var res  =  await http.post(that,url,data);
                if(res.errcode===0){
                     var text = document.getElementsByClassName('text')[0];
                     text.innerHTML=this.value8;
                     this.$Message.info('修改成功');
                }
            },
            //查询管理员信息
            async selectAdmin(){
                var that  = this;
                var url = 'adminRefund/queryAdminInfo';
                var data  = {

                }
                var res  =  await http.post(that,url,data);
                if(res.errcode==0&&res.data!=null){
                    that.adminMaster = res.data;
                    var dept_code = res.data.dept_code;
                    var deptCode
                    var debName
                    if(String(dept_code).substr(0, 6)=='100101'){
                         deptCode= '100101'
                         debName='妇科门诊'
                    }else if(String(dept_code).substr(0, 6)=='100102'){
                         deptCode= '100102'
                         debName='产科门诊'
                    }else if(String(dept_code).substr(0, 6)=='100103'){
                         deptCode= '100103'
                         debName='儿科门诊'
                    }else{
                        deptCode=String(dept_code);
                        debName=res.data.dept_name
                    }
                    localStorage.setItem('dept_code',deptCode);
                    localStorage.setItem('dept_name',debName)
                }
            },
            //切换医生身份
            async changestate(){
                var that = this;
                var url  = "system/doctorLogin";
                var that = this;
                var data  ={
                    
                }
                
                var res = await http.post(that,url,data);
                if(res.errcode==0){
                    that.$router.push('/Personalcenter')
                }else if(res.errcode==3001){
                    that.$Modal.warning({
                        title: '提示警告',
                        content: '抱歉您并不是医生，请勿操作'
                    });
                }
            }
        },
        mounted(){
           var  that = this;
           var permission = localStorage.getItem('permission');
           that.headimgurl = localStorage.getItem('avatar');
           that.permission = permission;
           that.selectAdmin();
        }
    }
</script>

<style scoped>
.tittle {
  height: 50px;
  /* text-align: center; */
  line-height: 50px;
 font-size: 4.2vw;
  font-family: PingFangSC-regular;
  display:-webkit-box;
  display:flex;
  display:-ms-flex;
  display:-webkit-flex;
      padding-left: 10%;
}
.switchopen{
  flex:1;
    -ms-flex:1;
    -webkit-flex:1;
        -webkit-box-flex:1;
        position: relative;
        text-align:center;
}
.circle{
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: rgb(255,255,255);
  position: absolute;
  top: 3px;
  right:4px;
}
.content{
   border-top: 2px solid rgb(238,238,238);
  padding-top: 10px;
}
.activecircle{
  left: 4px;
}
.activeswitchopen{
  text-align: right;
} 
.userssss{
    padding: 10px 0;
    position: relative;
}
.user{
    padding-left: 10px;
}
.user p {
    color: rgb(0, 0, 0);
    line-height: 1.7;
}
.content2{
    border-top: 1px solid #ddd;
    padding-bottom: 50px;
}
.content2 p{ 
     position: relative;
}
.content2 p svg {
  vertical-align: middle;
}
.content2 p span {
  display: inline-block;
  vertical-align: middle;
  padding-left: 10px;
}
.content2 p {
  padding: 18px 10% 18px 10%;
  border-bottom: 1px solid #aaa;
  color: black;
}
.content2 p span:nth-child(2){
        padding-left: 4vw;
}
.nav{
  display: flex;
             flex-wrap: wrap;
}
.nav_item{
  text-align: center;
  padding: 15px 0;
  width: 33%;
}
.nav_item1{
  border-bottom: 2px solid rgb(40,184,161);
  color: rgb(40,184,161);;
}
</style>