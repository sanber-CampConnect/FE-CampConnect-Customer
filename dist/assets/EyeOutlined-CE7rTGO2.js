import{r as f,g as k,e as Pt,d as _t,b7 as Tt,f as ot,J as Q,h as jt,m as rt,i as Rt,z as tt,C as at,bq as At,Z as It,aD as Nt,br as kt,bs as Et,bg as Vt,V as zt,bt as Lt,aQ as Bt,I as Mt}from"./index-h56-aQR2.js";import{a as Dt}from"./index-BGotda9i.js";const B=["blue","purple","cyan","green","magenta","pink","red","orange","yellow","volcano","geekblue","lime","gold"];function Xt(e,o){return B.reduce((a,t)=>{const r=e[`${t}1`],n=e[`${t}3`],s=e[`${t}6`],i=e[`${t}7`];return Object.assign(Object.assign({},a),o(t,{lightColor:r,lightBorderColor:n,darkColor:s,textColor:i}))},{})}function nt(e){var o=e.children,a=e.prefixCls,t=e.id,r=e.overlayInnerStyle,n=e.className,s=e.style;return f.createElement("div",{className:k("".concat(a,"-content"),n),style:s},f.createElement("div",{className:"".concat(a,"-inner"),id:t,role:"tooltip",style:r},typeof o=="function"?o():o))}var R={shiftX:64,adjustY:1},A={adjustX:1,shiftY:!0},b=[0,0],Ht={left:{points:["cr","cl"],overflow:A,offset:[-4,0],targetOffset:b},right:{points:["cl","cr"],overflow:A,offset:[4,0],targetOffset:b},top:{points:["bc","tc"],overflow:R,offset:[0,-4],targetOffset:b},bottom:{points:["tc","bc"],overflow:R,offset:[0,4],targetOffset:b},topLeft:{points:["bl","tl"],overflow:R,offset:[0,-4],targetOffset:b},leftTop:{points:["tr","tl"],overflow:A,offset:[-4,0],targetOffset:b},topRight:{points:["br","tr"],overflow:R,offset:[0,-4],targetOffset:b},rightTop:{points:["tl","tr"],overflow:A,offset:[4,0],targetOffset:b},bottomRight:{points:["tr","br"],overflow:R,offset:[0,4],targetOffset:b},rightBottom:{points:["bl","br"],overflow:A,offset:[4,0],targetOffset:b},bottomLeft:{points:["tl","bl"],overflow:R,offset:[0,4],targetOffset:b},leftBottom:{points:["br","bl"],overflow:A,offset:[-4,0],targetOffset:b}},Wt=["overlayClassName","trigger","mouseEnterDelay","mouseLeaveDelay","overlayStyle","prefixCls","children","onVisibleChange","afterVisibleChange","transitionName","animation","motion","placement","align","destroyTooltipOnHide","defaultVisible","getTooltipContainer","overlayInnerStyle","arrowContent","overlay","id","showArrow"],Yt=function(o,a){var t=o.overlayClassName,r=o.trigger,n=r===void 0?["hover"]:r,s=o.mouseEnterDelay,i=s===void 0?0:s,l=o.mouseLeaveDelay,u=l===void 0?.1:l,m=o.overlayStyle,c=o.prefixCls,p=c===void 0?"rc-tooltip":c,v=o.children,h=o.onVisibleChange,g=o.afterVisibleChange,y=o.transitionName,$=o.animation,w=o.motion,x=o.placement,S=x===void 0?"right":x,C=o.align,M=C===void 0?{}:C,I=o.destroyTooltipOnHide,D=I===void 0?!1:I,X=o.defaultVisible,N=o.getTooltipContainer,E=o.overlayInnerStyle;o.arrowContent;var H=o.overlay,W=o.id,P=o.showArrow,Y=P===void 0?!0:P,q=Pt(o,Wt),_=f.useRef(null);f.useImperativeHandle(a,function(){return _.current});var V=_t({},q);"visible"in o&&(V.popupVisible=o.visible);var F=function(){return f.createElement(nt,{key:"content",prefixCls:p,id:W,overlayInnerStyle:E},H)};return f.createElement(Tt,ot({popupClassName:t,prefixCls:p,popup:F,action:n,builtinPlacements:Ht,popupPlacement:S,ref:_,popupAlign:M,getPopupContainer:N,onPopupVisibleChange:h,afterPopupVisibleChange:g,popupTransitionName:y,popupAnimation:$,popupMotion:w,defaultPopupVisible:X,autoDestroy:D,mouseLeaveDelay:u,popupStyle:m,mouseEnterDelay:i,arrow:Y},V),v)};const qt=f.forwardRef(Yt);function Ft(e){const{sizePopupArrow:o,borderRadiusXS:a,borderRadiusOuter:t}=e,r=o/2,n=0,s=r,i=t*1/Math.sqrt(2),l=r-t*(1-1/Math.sqrt(2)),u=r-a*(1/Math.sqrt(2)),m=t*(Math.sqrt(2)-1)+a*(1/Math.sqrt(2)),c=2*r-u,p=m,v=2*r-i,h=l,g=2*r-n,y=s,$=r*Math.sqrt(2)+t*(Math.sqrt(2)-2),w=t*(Math.sqrt(2)-1),x=`polygon(${w}px 100%, 50% ${w}px, ${2*r-w}px 100%, ${w}px 100%)`,S=`path('M ${n} ${s} A ${t} ${t} 0 0 0 ${i} ${l} L ${u} ${m} A ${a} ${a} 0 0 1 ${c} ${p} L ${v} ${h} A ${t} ${t} 0 0 0 ${g} ${y} Z')`;return{arrowShadowWidth:$,arrowPath:S,arrowPolygon:x}}const Zt=(e,o,a)=>{const{sizePopupArrow:t,arrowPolygon:r,arrowPath:n,arrowShadowWidth:s,borderRadiusXS:i,calc:l}=e;return{pointerEvents:"none",width:t,height:t,overflow:"hidden","&::before":{position:"absolute",bottom:0,insetInlineStart:0,width:t,height:l(t).div(2).equal(),background:o,clipPath:{_multi_value_:!0,value:[r,n]},content:'""'},"&::after":{content:'""',position:"absolute",width:s,height:s,bottom:0,insetInline:0,margin:"auto",borderRadius:{_skip_check_:!0,value:`0 0 ${Q(i)} 0`},transform:"translateY(50%) rotate(-135deg)",boxShadow:a,zIndex:0,background:"transparent"}}},st=8;function it(e){const{contentRadius:o,limitVerticalRadius:a}=e,t=o>12?o+2:12;return{arrowOffsetHorizontal:t,arrowOffsetVertical:a?st:t}}function L(e,o){return e?o:{}}function Ut(e,o,a){const{componentCls:t,boxShadowPopoverArrow:r,arrowOffsetVertical:n,arrowOffsetHorizontal:s}=e,{arrowDistance:i=0,arrowPlacement:l={left:!0,right:!0,top:!0,bottom:!0}}={};return{[t]:Object.assign(Object.assign(Object.assign(Object.assign({[`${t}-arrow`]:[Object.assign(Object.assign({position:"absolute",zIndex:1,display:"block"},Zt(e,o,r)),{"&:before":{background:o}})]},L(!!l.top,{[[`&-placement-top > ${t}-arrow`,`&-placement-topLeft > ${t}-arrow`,`&-placement-topRight > ${t}-arrow`].join(",")]:{bottom:i,transform:"translateY(100%) rotate(180deg)"},[`&-placement-top > ${t}-arrow`]:{left:{_skip_check_:!0,value:"50%"},transform:"translateX(-50%) translateY(100%) rotate(180deg)"},[`&-placement-topLeft > ${t}-arrow`]:{left:{_skip_check_:!0,value:s}},[`&-placement-topRight > ${t}-arrow`]:{right:{_skip_check_:!0,value:s}}})),L(!!l.bottom,{[[`&-placement-bottom > ${t}-arrow`,`&-placement-bottomLeft > ${t}-arrow`,`&-placement-bottomRight > ${t}-arrow`].join(",")]:{top:i,transform:"translateY(-100%)"},[`&-placement-bottom > ${t}-arrow`]:{left:{_skip_check_:!0,value:"50%"},transform:"translateX(-50%) translateY(-100%)"},[`&-placement-bottomLeft > ${t}-arrow`]:{left:{_skip_check_:!0,value:s}},[`&-placement-bottomRight > ${t}-arrow`]:{right:{_skip_check_:!0,value:s}}})),L(!!l.left,{[[`&-placement-left > ${t}-arrow`,`&-placement-leftTop > ${t}-arrow`,`&-placement-leftBottom > ${t}-arrow`].join(",")]:{right:{_skip_check_:!0,value:i},transform:"translateX(100%) rotate(90deg)"},[`&-placement-left > ${t}-arrow`]:{top:{_skip_check_:!0,value:"50%"},transform:"translateY(-50%) translateX(100%) rotate(90deg)"},[`&-placement-leftTop > ${t}-arrow`]:{top:n},[`&-placement-leftBottom > ${t}-arrow`]:{bottom:n}})),L(!!l.right,{[[`&-placement-right > ${t}-arrow`,`&-placement-rightTop > ${t}-arrow`,`&-placement-rightBottom > ${t}-arrow`].join(",")]:{left:{_skip_check_:!0,value:i},transform:"translateX(-100%) rotate(-90deg)"},[`&-placement-right > ${t}-arrow`]:{top:{_skip_check_:!0,value:"50%"},transform:"translateY(-50%) translateX(-100%) rotate(-90deg)"},[`&-placement-rightTop > ${t}-arrow`]:{top:n},[`&-placement-rightBottom > ${t}-arrow`]:{bottom:n}}))}}function Jt(e,o,a,t){if(t===!1)return{adjustX:!1,adjustY:!1};const r=t&&typeof t=="object"?t:{},n={};switch(e){case"top":case"bottom":n.shiftX=o.arrowOffsetHorizontal*2+a,n.shiftY=!0,n.adjustY=!0;break;case"left":case"right":n.shiftY=o.arrowOffsetVertical*2+a,n.shiftX=!0,n.adjustX=!0;break}const s=Object.assign(Object.assign({},n),r);return s.shiftX||(s.adjustX=!0),s.shiftY||(s.adjustY=!0),s}const et={left:{points:["cr","cl"]},right:{points:["cl","cr"]},top:{points:["bc","tc"]},bottom:{points:["tc","bc"]},topLeft:{points:["bl","tl"]},leftTop:{points:["tr","tl"]},topRight:{points:["br","tr"]},rightTop:{points:["tl","tr"]},bottomRight:{points:["tr","br"]},rightBottom:{points:["bl","br"]},bottomLeft:{points:["tl","bl"]},leftBottom:{points:["br","bl"]}},Qt={topLeft:{points:["bl","tc"]},leftTop:{points:["tr","cl"]},topRight:{points:["br","tc"]},rightTop:{points:["tl","cr"]},bottomRight:{points:["tr","bc"]},rightBottom:{points:["bl","cr"]},bottomLeft:{points:["tl","bc"]},leftBottom:{points:["br","cl"]}},Gt=new Set(["topLeft","topRight","bottomLeft","bottomRight","leftTop","leftBottom","rightTop","rightBottom"]);function Kt(e){const{arrowWidth:o,autoAdjustOverflow:a,arrowPointAtCenter:t,offset:r,borderRadius:n,visibleFirst:s}=e,i=o/2,l={};return Object.keys(et).forEach(u=>{const m=t&&Qt[u]||et[u],c=Object.assign(Object.assign({},m),{offset:[0,0],dynamicInset:!0});switch(l[u]=c,Gt.has(u)&&(c.autoArrow=!1),u){case"top":case"topLeft":case"topRight":c.offset[1]=-i-r;break;case"bottom":case"bottomLeft":case"bottomRight":c.offset[1]=i+r;break;case"left":case"leftTop":case"leftBottom":c.offset[0]=-i-r;break;case"right":case"rightTop":case"rightBottom":c.offset[0]=i+r;break}const p=it({contentRadius:n,limitVerticalRadius:!0});if(t)switch(u){case"topLeft":case"bottomLeft":c.offset[0]=-p.arrowOffsetHorizontal-i;break;case"topRight":case"bottomRight":c.offset[0]=p.arrowOffsetHorizontal+i;break;case"leftTop":case"rightTop":c.offset[1]=-p.arrowOffsetHorizontal-i;break;case"leftBottom":case"rightBottom":c.offset[1]=p.arrowOffsetHorizontal+i;break}c.overflow=Jt(u,p,o,a),s&&(c.htmlRegion="visibleFirst")}),l}const te=e=>{const{componentCls:o,tooltipMaxWidth:a,tooltipColor:t,tooltipBg:r,tooltipBorderRadius:n,zIndexPopup:s,controlHeight:i,boxShadowSecondary:l,paddingSM:u,paddingXS:m}=e;return[{[o]:Object.assign(Object.assign(Object.assign(Object.assign({},Rt(e)),{position:"absolute",zIndex:s,display:"block",width:"max-content",maxWidth:a,visibility:"visible",transformOrigin:"var(--arrow-x, 50%) var(--arrow-y, 50%)","&-hidden":{display:"none"},"--antd-arrow-background-color":r,[`${o}-inner`]:{minWidth:"1em",minHeight:i,padding:`${Q(e.calc(u).div(2).equal())} ${Q(m)}`,color:t,textAlign:"start",textDecoration:"none",wordWrap:"break-word",backgroundColor:r,borderRadius:n,boxShadow:l,boxSizing:"border-box"},[["&-placement-left","&-placement-leftTop","&-placement-leftBottom","&-placement-right","&-placement-rightTop","&-placement-rightBottom"].join(",")]:{[`${o}-inner`]:{borderRadius:e.min(n,st)}},[`${o}-content`]:{position:"relative"}}),Xt(e,(c,p)=>{let{darkColor:v}=p;return{[`&${o}-${c}`]:{[`${o}-inner`]:{backgroundColor:v},[`${o}-arrow`]:{"--antd-arrow-background-color":v}}}})),{"&-rtl":{direction:"rtl"}})},Ut(e,"var(--antd-arrow-background-color)"),{[`${o}-pure`]:{position:"relative",maxWidth:"none",margin:e.sizePopupArrow}}]},ee=e=>Object.assign(Object.assign({zIndexPopup:e.zIndexPopupBase+70},it({contentRadius:e.borderRadius,limitVerticalRadius:!0})),Ft(rt(e,{borderRadiusOuter:Math.min(e.borderRadiusOuter,4)}))),lt=function(e){let o=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return jt("Tooltip",t=>{const{borderRadius:r,colorTextLightSolid:n,colorBgSpotlight:s}=t,i=rt(t,{tooltipMaxWidth:250,tooltipColor:n,tooltipBorderRadius:r,tooltipBg:s});return[te(i),Dt(t,"zoom-big-fast")]},ee,{resetStyle:!1,injectStyle:o})(e)},oe=B.map(e=>`${e}-inverse`),re=["success","processing","error","default","warning"];function ae(e){return(arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0)?[].concat(tt(oe),tt(B)).includes(e):B.includes(e)}function me(e){return re.includes(e)}function ct(e,o){const a=ae(o),t=k({[`${e}-${o}`]:o&&a}),r={},n={};return o&&!a&&(r.background=o,n["--antd-arrow-background-color"]=o),{className:t,overlayStyle:r,arrowStyle:n}}const ne=e=>{const{prefixCls:o,className:a,placement:t="top",title:r,color:n,overlayInnerStyle:s}=e,{getPrefixCls:i}=f.useContext(at),l=i("tooltip",o),[u,m,c]=lt(l),p=ct(l,n),v=p.arrowStyle,h=Object.assign(Object.assign({},s),p.overlayStyle),g=k(m,c,l,`${l}-pure`,`${l}-placement-${t}`,a,p.className);return u(f.createElement("div",{className:g,style:v},f.createElement("div",{className:`${l}-arrow`}),f.createElement(nt,Object.assign({},e,{className:m,prefixCls:l,overlayInnerStyle:h}),r)))};var se=function(e,o){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)o.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const ie=f.forwardRef((e,o)=>{var a,t;const{prefixCls:r,openClassName:n,getTooltipContainer:s,overlayClassName:i,color:l,overlayInnerStyle:u,children:m,afterOpenChange:c,afterVisibleChange:p,destroyTooltipOnHide:v,arrow:h=!0,title:g,overlay:y,builtinPlacements:$,arrowPointAtCenter:w=!1,autoAdjustOverflow:x=!0}=e,S=!!h,[,C]=At(),{getPopupContainer:M,getPrefixCls:I,direction:D}=f.useContext(at),X=Bt(),N=f.useRef(null),E=()=>{var d;(d=N.current)===null||d===void 0||d.forceAlign()};f.useImperativeHandle(o,()=>{var d;return{forceAlign:E,forcePopupAlign:()=>{X.deprecated(!1,"forcePopupAlign","forceAlign"),E()},nativeElement:(d=N.current)===null||d===void 0?void 0:d.nativeElement}});const[H,W]=It(!1,{value:(a=e.open)!==null&&a!==void 0?a:e.visible,defaultValue:(t=e.defaultOpen)!==null&&t!==void 0?t:e.defaultVisible}),P=!g&&!y&&g!==0,Y=d=>{var O,j;W(P?!1:d),P||((O=e.onOpenChange)===null||O===void 0||O.call(e,d),(j=e.onVisibleChange)===null||j===void 0||j.call(e,d))},q=f.useMemo(()=>{var d,O;let j=w;return typeof h=="object"&&(j=(O=(d=h.pointAtCenter)!==null&&d!==void 0?d:h.arrowPointAtCenter)!==null&&O!==void 0?O:w),$||Kt({arrowPointAtCenter:j,autoAdjustOverflow:x,arrowWidth:S?C.sizePopupArrow:0,borderRadius:C.borderRadius,offset:C.marginXXS,visibleFirst:!0})},[w,h,$,C]),_=f.useMemo(()=>g===0?g:y||g||"",[y,g]),V=f.createElement(Nt,null,typeof _=="function"?_():_),{getPopupContainer:F,placement:G="top",mouseEnterDelay:ft=.1,mouseLeaveDelay:ut=.1,overlayStyle:pt,rootClassName:mt}=e,K=se(e,["getPopupContainer","placement","mouseEnterDelay","mouseLeaveDelay","overlayStyle","rootClassName"]),T=I("tooltip",r),dt=I(),gt=e["data-popover-inject"];let Z=H;!("open"in e)&&!("visible"in e)&&P&&(Z=!1);const U=f.isValidElement(m)&&!kt(m)?m:f.createElement("span",null,m),z=U.props,bt=!z.className||typeof z.className=="string"?k(z.className,n||`${T}-open`):z.className,[ht,vt,wt]=lt(T,!gt),J=ct(T,l),yt=J.arrowStyle,Ct=Object.assign(Object.assign({},u),J.overlayStyle),Ot=k(i,{[`${T}-rtl`]:D==="rtl"},J.className,mt,vt,wt),[$t,xt]=Et("Tooltip",K.zIndex),St=f.createElement(qt,Object.assign({},K,{zIndex:$t,showArrow:S,placement:G,mouseEnterDelay:ft,mouseLeaveDelay:ut,prefixCls:T,overlayClassName:Ot,overlayStyle:Object.assign(Object.assign({},yt),pt),getTooltipContainer:F||s||M,ref:N,builtinPlacements:q,overlay:V,visible:Z,onVisibleChange:Y,afterVisibleChange:c??p,overlayInnerStyle:Ct,arrowContent:f.createElement("span",{className:`${T}-arrow-content`}),motion:{motionName:Vt(dt,"zoom-big-fast",e.transitionName),motionDeadline:1e3},destroyTooltipOnHide:!!v}),Z?zt(U,{className:bt}):U);return ht(f.createElement(Lt.Provider,{value:xt},St))}),le=ie;le._InternalPanelDoNotUseOrYouWillBeFired=ne;var ce={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},fe=function(o,a){return f.createElement(Mt,ot({},o,{ref:a,icon:ce}))},de=f.forwardRef(fe);export{de as R,le as T,me as a,Xt as g,ae as i};