(function(e){function t(t){for(var o,a,c=t[0],i=t[1],l=t[2],d=0,p=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&p.push(s[a][0]),s[a]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o]);u&&u(t);while(p.length)p.shift()();return r.push.apply(r,l||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,c=1;c<n.length;c++){var i=n[c];0!==s[i]&&(o=!1)}o&&(r.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},s={app:0},r=[];function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/REPO_NAME/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var u=i;r.push([1,"chunk-vendors"]),n()})({0:function(e,t){},1:function(e,t,n){e.exports=n("56d7")},2:function(e,t){},3:function(e,t){},4:function(e,t){},5:function(e,t){},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("2b0e"),s=n("7496"),r=n("a523"),a=n("f6c4"),c=function(){var e=this,t=e._self._c;return t(s["a"],[t(a["a"],[t(r["a"],{attrs:{"fill-height":""}},[t("router-view")],1)],1)],1)},i=[],l={name:"App",components:{},data:()=>({})},u=l,d=n("2877"),p=Object(d["a"])(u,c,i,!1,null,"52959183",null),m=p.exports,f=n("8c4f"),h=n("8336"),g=n("b0af"),b=n("99d9"),y=n("62ad"),v=n("132d"),w=n("0fd9"),_=n("1f4f"),q=function(){var e=this,t=e._self._c;return t(w["a"],{attrs:{align:"center",justify:"center"}},[e.client.connected?t(y["a"],[t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{staticClass:"d-flex align-center justify-center primary--text",attrs:{cols:"12",sm:"6"}},[e._v(" Hi "+e._s(e.getUsername)+" ")])],1),t(w["a"],{attrs:{align:"center",justify:"center"}},[e.viewLogs?t(y["a"],[t(_["a"],{scopedSlots:e._u([{key:"default",fn:function(){return[t("thead",[t("tr",[t("th",{staticClass:"text-left"},[e._v(" Name ")]),t("th",{staticClass:"text-left"},[e._v(" Time ")]),t("th",{staticClass:"text-left"},[e._v(" Via ")])])]),t("tbody",e._l(e.logs,(function(n){return t("tr",{key:n.name},[t("td",[e._v(e._s(n.name))]),t("td",[e._v(e._s(n.time))]),t("td",[e._v(e._s(n.via))])])})),0)]},proxy:!0}],null,!1,3282560750)}),t(h["a"],{staticClass:"mr-4 mt-4",attrs:{outlined:"",color:"primary"},on:{click:function(t){e.viewLogs=!1}}},[e._v(" back ")])],1):t(y["a"],[e.battery?t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{staticClass:"d-flex align-center justify-center",attrs:{cols:"12",sm:"6"}},[t(v["a"],{attrs:{color:e.battery>29?"primary":"red"}},[e._v("mdi-battery"+e._s(e.batterySuffix(e.battery)))]),t("p",{staticClass:"pa-0 mx-3 my-0",class:e.battery>29?"primary--text":"red--text"},[e._v(e._s(e.battery)+" %")])],1)],1):t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{staticClass:"d-flex align-center justify-center",attrs:{cols:"12",sm:"6"}},[t(v["a"],{attrs:{color:"red"}},[e._v("mdi-battery-unknown")]),t("p",{staticClass:"red--text pa-0 mx-3 my-0"},[e._v("Unavaliable")])],1)],1),t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{staticClass:"d-flex align-center justify-center"},[t(h["a"],{attrs:{color:"primary",text:""},on:{click:e.openDoor}},[t(v["a"],{attrs:{left:""}},[e._v(" mdi-door-open ")]),e._v(" Open door ")],1)],1)],1),t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{staticClass:"d-flex align-center justify-center"},[t(h["a"],{attrs:{color:"primary",text:""},on:{click:e.getLogs}},[t(v["a"],{attrs:{left:""}},[e._v(" mdi-clock-outline ")]),e._v(" View Access logs ")],1)],1)],1)],1)],1)],1):t(y["a"],{attrs:{cols:"12",sm:"6"}},[t(g["a"],{attrs:{outlined:"",tile:""}},[t(b["b"],[e._v(" Disconnected ")]),t(b["a"],[e._v(" Please check your internet connection. ")])],1)],1)],1)},x=[],k=n("e7fc"),j=n.n(k),I=n("2f62"),O={computed:{...Object(I["c"])(["getUsername"])},created(){this.client.connected||this.fetchMqttDetails()},data(){return{battery:null,viewLogs:!1,logs:[],connection:{host:"mqtt.uptima.co",port:8883,endpoint:"",clean:!0,connectTimeout:4e3,reconnectPeriod:4e3,clientId:null,username:null,password:null},subscription:{topic:"door/battery",qos:0},publish:{topic:"door/open",qos:0},receiveNews:"",qosList:[{label:0,value:0},{label:1,value:1},{label:2,value:2}],client:{connected:!1},subscribeSuccess:!1}},methods:{batterySuffix(e){const t=10*Math.ceil(e/10);return t<100?"-"+t:""},getLogs(){this.viewLogs=!0},fetchMqttDetails(){console.log("fetch func called");const e="mqtt-user-info";this.$axios.get(e).then(e=>{const t=e.data.data.mqttInfo[0];this.connection.clientId=t.id,this.connection.username=t.username,this.connection.password=t.password,this.createConnection()}).catch(e=>{console.log(e)})},createConnection(){console.log("con func called");const e=`mqtt://${this.connection.host}:${this.connection.port}`;try{this.client=j.a.connect(e,{clientId:this.connection.clientId,protocol:"mqtt",username:this.connection.username,password:this.connection.password})}catch(o){console.log("mqtt.connect error",o)}this.client.on("offline",()=>{console.log("Disconnected!")}),this.client.on("error",e=>{console.log("Connection failed",e)}),this.client.on("message",(e,t)=>{"door/battery"===e&&(this.battery=t),console.log(`Received message ${t} from topic ${e}`)});const{topic:t,qos:n}=this.subscription;this.client.subscribe(t,{qos:n},(e,t)=>{e?console.log("Subscribe to topics error",e):(this.subscribeSuccess=!0,console.log("Subscribe to topics res",t))})},openDoor(){const{topic:e,qos:t}=this.publish;this.client.publish(e,t,e=>{e&&console.log("Publish error",e)})}}},C=O,P=Object(d["a"])(C,q,x,!1,null,null,null),F=P.exports,S=n("4bd4"),D=n("8654"),L=function(){var e=this,t=e._self._c;return t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],{attrs:{justify:"center",cols:"12",sm:"6"}},[t(S["a"],{ref:"form",on:{submit:function(t){return t.preventDefault(),e.login.apply(null,arguments)}},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[t(D["a"],{attrs:{rules:[e.rules.required],label:"Username"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),t(D["a"],{attrs:{"append-icon":e.show?"mdi-eye":"mdi-eye-off",rules:[e.rules.required,e.rules.min],type:e.show?"text":"password",name:"password",label:"Password"},on:{"click:append":function(t){e.show=!e.show}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),t(w["a"],{attrs:{align:"center",justify:"center"}},[t(y["a"],[t(h["a"],{staticClass:"mr-4",attrs:{outlined:"",color:"primary",type:"submit",disabled:!e.valid}},[e._v(" Login ")])],1)],1)],1)],1)],1)},A=[],U={data(){return{valid:!1,username:"",show:!1,password:"",rules:{required:e=>!!e||"Required.",min:e=>e.length>=6||"Min 6 characters"},connection:{host:"broker.emqx.io",port:8083,endpoint:"/mqtt",clean:!0,connectTimeout:4e3,reconnectPeriod:4e3,clientId:"mqttjs_3be2c321",username:"emqx_test",password:"emqx_test"},subscription:{topic:"topic/mqttx",qos:0},publish:{topic:"topic/browser",qos:0,payload:'{ "msg": "Hello, I am browser." }'},receiveNews:"",qosList:[{label:0,value:0},{label:1,value:1},{label:2,value:2}],client:{connected:!1},subscribeSuccess:!1}},methods:{...Object(I["b"])(["user"]),login(){const e="dashboard-login",t={username:this.username,password:this.password};this.$axios.post(e,t).then(e=>{const t={token:e.data.data.token,username:this.username};this.user(t),this.$router.push("/")}).catch(e=>{console.log(e)})}}},M=U,T=Object(d["a"])(M,L,A,!1,null,null,null),$=T.exports,E=n("bfa9");const N=new E["a"]({storage:localStorage,key:"uLock",reducer:e=>({loggedIn:e.loggedIn,token:e.token,username:e.username})});o["a"].use(I["a"]);var R=new I["a"].Store({state:{loggedIn:!1,token:null,username:null,mqttUsername:null,mqttPassword:null,mqttAppID:null,client:{connected:!1}},getters:{isLoggedIn:e=>e.loggedIn,getToken:e=>e.token,getUsername:e=>e.username,getMqttCred:e=>({mqttUsername:e.mqttUsername,mqttPassword:e.mqttPassword,mqttAppID:e.mqttAppID})},mutations:{setUser(e,t){e.token=t.token,e.username=t.username,e.loggedIn=!0},clearData(e){e.loggedIn=!1,e.token=null,e.username=null,e.mqttUsername=null,e.mqttPassword=null,e.mqttAppID=!1}},actions:{user({commit:e},t){e("setUser",t)},clearAll({commit:e}){window.localStorage.removeItem("uLock"),e("clearData")}},plugins:[N.plugin]});function B(){return R.getters.isLoggedIn}function H(e,t,n){B()?n({path:"/"}):n()}function z(e,t,n){B()?n():n({path:"/login"})}o["a"].use(f["a"]);const J=[{path:"/",name:"Home",component:F,beforeEnter:z},{path:"/login",name:"login",component:$,beforeEnter:H}],V=new f["a"]({mode:"history",base:"/REPO_NAME/",routes:J});var G=V,K=n("bc3a"),Q=n.n(K);const W=Q.a.create({baseURL:"https://ulock-backend.herokuapp.com/",timeout:36e3,headers:{},crossdomain:!0});var X=W,Y=n("f309");o["a"].use(Y["a"]);var Z=new Y["a"]({theme:{themes:{light:{primary:"#5051DB",secondary:"#000000",third:"#FFFFFF",accent:"#3887F6",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107",background:"#F0F0F2"}}}});o["a"].prototype.$axios=X,o["a"].config.productionTip=!1,new o["a"]({router:G,store:R,created(){this.getToken&&(X.defaults.headers.Authorization="Bearer "+this.getToken)},computed:{...Object(I["c"])(["getToken"])},watch:{getToken(e){X.defaults.headers.Authorization="Bearer "+e}},vuetify:Z,render:e=>e(m)}).$mount("#app")},6:function(e,t){}});
//# sourceMappingURL=app.33ff6f31.js.map