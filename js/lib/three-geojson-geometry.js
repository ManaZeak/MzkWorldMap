// Version 1.1.0 three-geojson-geometry - https://github.com/vasturiano/three-geojson-geometry
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("three")):"function"==typeof define&&define.amd?define(["exports","three"],t):t((e=e||self).THREE=e.THREE||{},e.THREE)}(this,(function(e,t){"use strict";function n(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if(!(Symbol.iterator in Object(e))&&"[object Arguments]"!==Object.prototype.toString.call(e))return;var n=[],r=!0,i=!1,u=void 0;try{for(var o,x=e[Symbol.iterator]();!(r=(o=x.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){i=!0,u=e}finally{try{r||null==x.return||x.return()}finally{if(i)throw u}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}var r=u,i=u;function u(e,t,n){n=n||2;var r,i,u,v,a,c,h,s=t&&t.length,p=s?t[0]*n:e.length,g=o(e,0,p,n,!0),m=[];if(!g||g.next===g.prev)return m;if(s&&(g=function(e,t,n,r){var i,u,f,v,a,c=[];for(i=0,u=t.length;i<u;i++)f=t[i]*r,v=i<u-1?t[i+1]*r:e.length,(a=o(e,f,v,r,!1))===a.next&&(a.steiner=!0),c.push(d(a));for(c.sort(l),i=0;i<c.length;i++)y(c[i],n),n=x(n,n.next);return n}(e,t,g,n)),e.length>80*n){r=u=e[0],i=v=e[1];for(var M=n;M<p;M+=n)(a=e[M])<r&&(r=a),(c=e[M+1])<i&&(i=c),a>u&&(u=a),c>v&&(v=c);h=0!==(h=Math.max(u-r,v-i))?1/h:0}return f(g,m,n,r,i,h),m}function o(e,t,n,r,i){var u,o;if(i===S(e,t,n,r)>0)for(u=t;u<n;u+=r)o=A(u,e[u],e[u+1],o);else for(u=n-r;u>=t;u-=r)o=A(u,e[u],e[u+1],o);return o&&Z(o,o.next)&&(B(o),o=o.next),o}function x(e,t){if(!e)return e;t||(t=e);var n,r=e;do{if(n=!1,r.steiner||!Z(r,r.next)&&0!==M(r.prev,r,r.next))r=r.next;else{if(B(r),(r=t=r.prev)===r.next)break;n=!0}}while(n||r!==t);return t}function f(e,t,n,r,i,u,o){if(e){!o&&u&&function(e,t,n,r){var i=e;do{null===i.z&&(i.z=p(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next}while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,function(e){var t,n,r,i,u,o,x,f,v=1;do{for(n=e,e=null,u=null,o=0;n;){for(o++,r=n,x=0,t=0;t<v&&(x++,r=r.nextZ);t++);for(f=v;x>0||f>0&&r;)0!==x&&(0===f||!r||n.z<=r.z)?(i=n,n=n.nextZ,x--):(i=r,r=r.nextZ,f--),u?u.nextZ=i:e=i,i.prevZ=u,u=i;n=r}u.nextZ=null,v*=2}while(o>1)}(i)}(e,r,i,u);for(var l,y,s=e;e.prev!==e.next;)if(l=e.prev,y=e.next,u?a(e,r,i,u):v(e))t.push(l.i/n),t.push(e.i/n),t.push(y.i/n),B(e),e=y.next,s=y.next;else if((e=y)===s){o?1===o?f(e=c(x(e),t,n),t,n,r,i,u,2):2===o&&h(e,t,n,r,i,u):f(x(e),t,n,r,i,u,1);break}}}function v(e){var t=e.prev,n=e,r=e.next;if(M(t,n,r)>=0)return!1;for(var i=e.next.next;i!==e.prev;){if(g(t.x,t.y,n.x,n.y,r.x,r.y,i.x,i.y)&&M(i.prev,i,i.next)>=0)return!1;i=i.next}return!0}function a(e,t,n,r){var i=e.prev,u=e,o=e.next;if(M(i,u,o)>=0)return!1;for(var x=i.x<u.x?i.x<o.x?i.x:o.x:u.x<o.x?u.x:o.x,f=i.y<u.y?i.y<o.y?i.y:o.y:u.y<o.y?u.y:o.y,v=i.x>u.x?i.x>o.x?i.x:o.x:u.x>o.x?u.x:o.x,a=i.y>u.y?i.y>o.y?i.y:o.y:u.y>o.y?u.y:o.y,c=p(x,f,t,n,r),h=p(v,a,t,n,r),l=e.prevZ,y=e.nextZ;l&&l.z>=c&&y&&y.z<=h;){if(l!==e.prev&&l!==e.next&&g(i.x,i.y,u.x,u.y,o.x,o.y,l.x,l.y)&&M(l.prev,l,l.next)>=0)return!1;if(l=l.prevZ,y!==e.prev&&y!==e.next&&g(i.x,i.y,u.x,u.y,o.x,o.y,y.x,y.y)&&M(y.prev,y,y.next)>=0)return!1;y=y.nextZ}for(;l&&l.z>=c;){if(l!==e.prev&&l!==e.next&&g(i.x,i.y,u.x,u.y,o.x,o.y,l.x,l.y)&&M(l.prev,l,l.next)>=0)return!1;l=l.prevZ}for(;y&&y.z<=h;){if(y!==e.prev&&y!==e.next&&g(i.x,i.y,u.x,u.y,o.x,o.y,y.x,y.y)&&M(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function c(e,t,n){var r=e;do{var i=r.prev,u=r.next.next;!Z(i,u)&&w(i,r,r.next,u)&&G(i,u)&&G(u,i)&&(t.push(i.i/n),t.push(r.i/n),t.push(u.i/n),B(r),B(r.next),r=e=u),r=r.next}while(r!==e);return x(r)}function h(e,t,n,r,i,u){var o=e;do{for(var v=o.next.next;v!==o.prev;){if(o.i!==v.i&&m(o,v)){var a=z(o,v);return o=x(o,o.next),a=x(a,a.next),f(o,t,n,r,i,u),void f(a,t,n,r,i,u)}v=v.next}o=o.next}while(o!==e)}function l(e,t){return e.x-t.x}function y(e,t){if(t=function(e,t){var n,r=t,i=e.x,u=e.y,o=-1/0;do{if(u<=r.y&&u>=r.next.y&&r.next.y!==r.y){var x=r.x+(u-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(x<=i&&x>o){if(o=x,x===i){if(u===r.y)return r;if(u===r.next.y)return r.next}n=r.x<r.next.x?r:r.next}}r=r.next}while(r!==t);if(!n)return null;if(i===o)return n;var f,v=n,a=n.x,c=n.y,h=1/0;r=n;do{i>=r.x&&r.x>=a&&i!==r.x&&g(u<c?i:o,u,a,c,u<c?o:i,u,r.x,r.y)&&(f=Math.abs(u-r.y)/(i-r.x),G(r,e)&&(f<h||f===h&&(r.x>n.x||r.x===n.x&&s(n,r)))&&(n=r,h=f)),r=r.next}while(r!==v);return n}(e,t)){var n=z(t,e);x(t,t.next),x(n,n.next)}}function s(e,t){return M(e.prev,e,t.prev)<0&&M(t.next,e,e.next)<0}function p(e,t,n,r,i){return(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=32767*(e-n)*i)|e<<8))|e<<4))|e<<2))|e<<1))|(t=1431655765&((t=858993459&((t=252645135&((t=16711935&((t=32767*(t-r)*i)|t<<8))|t<<4))|t<<2))|t<<1))<<1}function d(e){var t=e,n=e;do{(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next}while(t!==e);return n}function g(e,t,n,r,i,u,o,x){return(i-o)*(t-x)-(e-o)*(u-x)>=0&&(e-o)*(r-x)-(n-o)*(t-x)>=0&&(n-o)*(u-x)-(i-o)*(r-x)>=0}function m(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!function(e,t){var n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&w(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}(e,t)&&(G(e,t)&&G(t,e)&&function(e,t){var n=e,r=!1,i=(e.x+t.x)/2,u=(e.y+t.y)/2;do{n.y>u!=n.next.y>u&&n.next.y!==n.y&&i<(n.next.x-n.x)*(u-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next}while(n!==e);return r}(e,t)&&(M(e.prev,e,t.prev)||M(e,t.prev,t))||Z(e,t)&&M(e.prev,e,e.next)>0&&M(t.prev,t,t.next)>0)}function M(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Z(e,t){return e.x===t.x&&e.y===t.y}function w(e,t,n,r){var i=E(M(e,t,n)),u=E(M(e,t,r)),o=E(M(n,r,e)),x=E(M(n,r,t));return i!==u&&o!==x||(!(0!==i||!b(e,n,t))||(!(0!==u||!b(e,r,t))||(!(0!==o||!b(n,e,r))||!(0!==x||!b(n,t,r)))))}function b(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function E(e){return e>0?1:e<0?-1:0}function G(e,t){return M(e.prev,e,e.next)<0?M(e,t,e.next)>=0&&M(e,e.prev,t)>=0:M(e,t,e.prev)<0||M(e,e.next,t)<0}function z(e,t){var n=new P(e.i,e.x,e.y),r=new P(t.i,t.x,t.y),i=e.next,u=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,u.next=r,r.prev=u,r}function A(e,t,n,r){var i=new P(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function B(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function P(e,t,n){this.i=e,this.x=t,this.y=n,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function S(e,t,n,r){for(var i=0,u=t,o=n-r;u<n;u+=r)i+=(e[o]-e[u])*(e[u+1]+e[o+1]),o=u;return i}u.deviation=function(e,t,n,r){var i=t&&t.length,u=i?t[0]*n:e.length,o=Math.abs(S(e,0,u,n));if(i)for(var x=0,f=t.length;x<f;x++){var v=t[x]*n,a=x<f-1?t[x+1]*n:e.length;o-=Math.abs(S(e,v,a,n))}var c=0;for(x=0;x<r.length;x+=3){var h=r[x]*n,l=r[x+1]*n,y=r[x+2]*n;c+=Math.abs((e[h]-e[y])*(e[l+1]-e[h+1])-(e[h]-e[l])*(e[y+1]-e[h+1]))}return 0===o&&0===c?0:Math.abs((c-o)/o)},u.flatten=function(e){for(var t=e[0][0].length,n={vertices:[],holes:[],dimensions:t},r=0,i=0;i<e.length;i++){for(var u=0;u<e[i].length;u++)for(var o=0;o<t;o++)n.vertices.push(e[i][u][o]);i>0&&(r+=e[i-1].length,n.holes.push(r))}return n},r.default=i;var j=function(e,t,n){for(var r=[],i=1;i<=n;i++)r.push(e+(t-e)*i/(n+1));return r},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=[],r=null;return e.forEach((function(e){if(r){var i=Math.sqrt(Math.pow(e[0]-r[0],2)+Math.pow(e[1]-r[1],2));if(i>t)for(var u=Math.floor(i/t),o=j(r[0],e[0],u),x=j(r[1],e[1],u),f=0,v=o.length;f<v;f++)n.push([o[f],x[f]])}n.push(r=e)})),n},H=window.THREE?window.THREE:{BufferGeometry:t.BufferGeometry,Float32BufferAttribute:t.Float32BufferAttribute,Geometry:t.Geometry},R=(new H.BufferGeometry).setAttribute?"setAttribute":"addAttribute";function I(e){var t=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,u=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5;H.BufferGeometry.call(this),this.type="GeoJsonGeometry",this.parameters={geoJson:e,radius:i,resolution:u};var o=({Point:a,MultiPoint:c,LineString:h,MultiLineString:l,Polygon:y,MultiPolygon:s}[e.type]||function(){return[]})(e.coordinates,i),x=[],f=[],v=0;function a(e,t){return[{vertices:J(e[1],e[0],t),indices:[]}]}function c(e,t){var r={vertices:[],indices:[]};return e.map((function(e){return a(e,t)})).forEach((function(e){var t=n(e,1)[0];O(r,t)})),[r]}function h(e,t){for(var i=T(e,u).map((function(e){var r=n(e,2),i=r[0];return J(r[1],i,t)})),o=r.flatten([i]).vertices,x=Math.round(o.length/3),f=[],v=1;v<x;v++)f.push(v-1,v);return[{vertices:o,indices:f}]}function l(e,t){var r={vertices:[],indices:[]};return e.map((function(e){return h(e,t)})).forEach((function(e){var t=n(e,1)[0];O(r,t)})),[r]}function y(e,t){for(var i=e.map((function(e){return T(e,u).map((function(e){var r=n(e,2),i=r[0];return J(r[1],i,t)}))})),o=r.flatten(i),x=o.vertices,f=o.holes,v=f[0]||1/0,a=x.slice(0,v),c=x.slice(v),h=new Set(f),l=Math.round(x.length/3),y=[],s=[],p=1;p<l;p++)h.has(p)||(p<v?y.push(p-1,p):s.push(p-1-v,p-v));var d=[{indices:y,vertices:a}];return f.length&&d.push({indices:s,vertices:c}),d}function s(e,t){var r={vertices:[],indices:[]},i={vertices:[],indices:[]};e.map((function(e){return y(e,t)})).forEach((function(e){var t=n(e,2),u=t[0],o=t[1];O(r,u),o&&O(i,o)}));var u=[r];return i.vertices.length&&u.push(i),u}o.forEach((function(e){var n=x.length;O({indices:x,vertices:f},e),t.addGroup(n,x.length-n,v++)})),x.length&&this.setIndex(x),f.length&&this[R]("position",new H.Float32BufferAttribute(f,3))}function O(e,t){var n=Math.round(e.vertices.length/3);F(e.vertices,t.vertices),F(e.indices,t.indices.map((function(e){return e+n})))}function F(e,t){var n=!0,r=!1,i=void 0;try{for(var u,o=t[Symbol.iterator]();!(n=(u=o.next()).done);n=!0){var x=u.value;e.push(x)}}catch(e){r=!0,i=e}finally{try{n||null==o.return||o.return()}finally{if(r)throw i}}}function J(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=(90-e)*Math.PI/180,i=(90-t)*Math.PI/180;return[n*Math.sin(r)*Math.cos(i),n*Math.cos(r),n*Math.sin(r)*Math.sin(i)]}I.prototype=Object.create(H.BufferGeometry.prototype),I.prototype.constructor=I,e.GeoJsonGeometry=I,Object.defineProperty(e,"__esModule",{value:!0})}));
