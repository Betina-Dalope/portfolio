(this.webpackJsonpportfolio=this.webpackJsonpportfolio||[]).push([[0],{11:function(e){e.exports=JSON.parse('[{"title":"Home","position":{"x":-8,"y":6,"z":-8,"rotation":0},"subtitle":"<h1>Betina Dalope</h1><p>Philadelphia, PA</p>","description":"<h2>Contact</h2><p><strong>Email: </strong> betina.devwork@gmail.com</p><p><strong>LinkedIn: </strong>https://www.linkedin.com/in/mbetina/</p>"},{"title":"Work","position":{"x":8,"y":10,"z":-8,"rotation":-0.7854},"projects":[{"title":"Harvard College","url":"https://college.harvard.edu/","role":"front-end developer","tech":"Drupal 8, PHP, HTML, CSS (Sass), jQuery, Pantheon","description":"A large drupal project with an emphasis on accessibility and performance on all browsers and devices.","image":"/images/harvard/home.png"},{"title":"National World War II Museum","url":"https://www.nationalww2museum.org/","role":"front-end developer","tech":"Drupal 8, PHP, HTML, CSS (Sass), jQuery, Pantheon","description":"A large drupal project with complex shapes and responsive design","image":"/images/nwwiim/home.png"},{"title":"Longwood Gardens Map","url":"https://longwoodgardens.org/maps/orchid","role":"lead front-end developer","tech":"JavaScript, HTML, CSS (Sass)","description":"A one-page, wayfinding application intended for use on mobile devices.","image":"/images/longwood/desktop.png"},{"title":"Bluecadet","url":"https://www.bluecadet.com/","role":"lead developer","tech":"Wordpress, PHP, HTML, CSS (Sass), jQuery, Pantheon","description":"A marketing website with many assets and a custom wordpress CMS","image":"/images/bluecadet/home.png"},{"title":"Fords Theatre Kiosk","role":"lead front-end developer","tech":"React, Node.js, Gsap, Drupal, CSS (Sass), Rest API","description":"A React application installed on 7 large screens on-site with real-time alerts and scheduling updates","image":"/images/ford-theatre/logo.png"},{"title":"Bill & Melinda Gates Foundation Photo Booth","role":"front-end developer","tech":"Angular 2, Node.js, Wordpress, Gsap, SVG Animations, Rest API","description":"A touch screen application installed on site.  Hundreds of visitors a day.","image":"/images/gates/photobooth.jpeg"},{"title":"Mural Arts","role":"front-end developer","tech":"Wordpress, HTML, CSS (Sass), jQuery","description":"A touch screen application installed on site.  Hundreds of visitors a day.","image":"/images/mural-arts/home.png"}]},{"title":"Prototypes","position":{"x":-8,"y":4,"z":8,"rotation":1.5708},"projects":[{"title":"About this site","tech":"Three.js, Gsap, React","image":"/images/kinetkbass/angle-logo.png"},{"title":"Kinetk Website","tech":"Three.js, Gsap, React, Blender","image":"/images/kinetkbass/color-test-cube.png"},{"title":"What\'s Your Color?","tech":"React, Gsap","video":"you need to download the repo and deploy yourself or take a video"}],"gallery":[{"type":"video","tech":"Three.js, Gsap, React","src":"/images/kinetkbass/original-in-the-cube.mov"},{"type":"video","tech":"Three.js, Gsap, React","src":"/images/boxes.mov"},{"type":"video","tech":"Three.js, Gsap, React","src":"/images/kinetkbass/init-ani.mov"},{"type":"image","tech":"Three.js, Gsap, React","src":"/images/kinetkbass/green-shadow.png"},{"type":"video","tech":"Three.js, Gsap, React","src":"/images/stage.mov"},{"type":"image","tech":"Three.js, Gsap, React","src":"/images/kinetkbass/angle-logo.png"},{"type":"video","tech":"Three.js, Gsap, React","src":"/images/kinetkbass/shadow.mov"}]},{"title":"Music","position":{"x":8,"y":6,"z":8,"rotation":3.1415}}]')},131:function(e,t,a){e.exports=a(289)},136:function(e,t,a){},148:function(e,t,a){},285:function(e,t,a){},286:function(e,t,a){},289:function(e,t,a){"use strict";a.r(t);var n,r,i=a(0),o=a.n(i),s=a(123),l=a.n(s),c=(a(136),a(5)),d=a(8),h=a(6),p=a(7),u=a(83),m=a(26),g=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={pixel_color_obj:{}},e.getPixel=function(e,t,a){var n=4*(t+e.width*a),r=e.data;return{r:r[n],g:r[n+1],b:r[n+2],a:r[n+3]}},e.onCanvasClick=function(t){var a=t.target.getBoundingClientRect(),n=Math.round(t.clientX-a.left),r=Math.round(t.clientY-a.top);console.log("Coordinate x: "+n,"Coordinate y: "+r);var i=e.getPixel(e.canvasData,n,r);e.setState({pixel_color_obj:i})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=new Image;t.src="./images/test-image.png";var a=this.refs.canvas.getContext("2d");t.onload=function(){var n=e.refs.canvas.width/t.width,r=e.refs.canvas.height/t.height,i=Math.min(n,r),o=(e.refs.canvas.width-t.width*i)/2,s=(e.refs.canvas.height-t.height*i)/2;a.drawImage(t,0,0,t.width,t.height,o,s,t.width*i,t.height*i),e.canvasData=a.getImageData(0,0,e.refs.canvas.width,e.refs.canvas.height)}}},{key:"render",value:function(){var e="rgb( "+this.state.pixel_color_obj.r+", "+this.state.pixel_color_obj.g+", "+this.state.pixel_color_obj.b+", "+this.state.pixel_color_obj.a+")";return o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Test Color Extender"),o.a.createElement("canvas",{ref:"canvas",width:"400",height:"200",style:{backgroundColor:"red"},onClick:this.onCanvasClick}),o.a.createElement("div",{ref:"calculatedColor",style:{height:"20px",width:"20px",backgroundColor:e}}),o.a.createElement("p",null,"R: ",this.state.pixel_color_obj.r," G: ",this.state.pixel_color_obj.g," B: ",this.state.pixel_color_obj.b))}}]),a}(o.a.Component),v="./images/IMG_2709.jpeg",f=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={pixel_color_obj:{}},e.colorCellFromPixel=function(t,a){var n=e.refs.colorTable.childNodes[a].childNodes[t],r=e.getPixel(e.canvasData,t,a);n.style.backgroundColor="rgb( "+r.r+", "+r.g+", "+r.b+", "+r.a+")"},e.getPixel=function(e,t,a){var n=4*(t+e.width*a),r=e.data;return{r:r[n],g:r[n+1],b:r[n+2],a:r[n+3]}},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this,t=new Image;t.src=v;var a=this.refs.canvas.getContext("2d");t.onload=function(){var n=e.refs.canvas.width/t.width,r=e.refs.canvas.height/t.height,i=Math.min(n,r),o=(e.refs.canvas.width-t.width*i)/2,s=(e.refs.canvas.height-t.height*i)/2;a.drawImage(t,0,0,t.width,t.height,o,s,t.width*i,t.height*i),e.canvasData=a.getImageData(0,0,e.refs.canvas.width,e.refs.canvas.height);for(var l=0;l<12;l++)e.colorCellFromPixel(l,0),e.colorCellFromPixel(l,8);for(l=0;l<9;l++)e.colorCellFromPixel(0,l),e.colorCellFromPixel(11,l)}}},{key:"render",value:function(){for(var e="rgb( "+this.state.pixel_color_obj.r+", "+this.state.pixel_color_obj.g+", "+this.state.pixel_color_obj.b+", "+this.state.pixel_color_obj.a+")",t=[],a=0;a<9;a++){for(var n=[],r=0;r<12;r++)n.push(o.a.createElement("td",{style:{height:"20px",width:"20px",backgroundColor:e}}));t.push(o.a.createElement("tr",null,n))}return o.a.createElement(o.a.Fragment,null,o.a.createElement("canvas",{ref:"canvas",width:12,height:9,style:{backgroundColor:"red"}}),o.a.createElement("div",{style:{position:"relative"}},o.a.createElement("table",{ref:"colorTable"},t),o.a.createElement("img",{src:v,height:165,width:240,style:{objectFit:"contain",position:"absolute",top:26,left:25}})))}}]),a}(o.a.Component),b=a(36),w=a(1),y=a(37),j=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var i;for(var o in Object(c.a)(this,a),(i=t.call(this,e)).constructColorPanels=function(e){var t=new w.l;t.name="color panels";for(var a=new w.s,n=e/2,r=0;r<e;r++){for(var o=new w.l,s=Math.round(Math.random()*(i.props.grid_size.depth-1))+1,l=0;l<s-1;l++){var c=new w.p({color:"black",side:w.h}),d=new w.o(a,c);d.position.set(r-n+.5,0,n-.5-l),d.rotation.x=Math.PI/2,o.add(d)}t.add(o)}return t},i.loadImage=function(){var e=new Image;e.src=i.props.image_src;var t=i.refs.image_loader.getContext("2d");e.onload=function(){var a=n/e.width,o=r/e.height,s=Math.min(a,o),l=(n-e.width*s)/2,c=(r-e.height*s)/2;t.drawImage(e,0,0,e.width,e.height,l,c,e.width*s,e.height*s);for(var d=t.getImageData(0,0,n,r),h=0;h<n;h++)i.colorCellFromPixel(d,h,h,0,i.ceiling),i.colorCellFromPixel(d,h,h,r-1,i.floor);for(h=0;h<r;h++)i.colorCellFromPixel(d,h,0,h,i.wall_left),i.colorCellFromPixel(d,h,n-1,h,i.wall_right)};var a=Object(b.a)(i);i.refs.image.onload=function(e){var t=new w.B(this);t.needsUpdate=!0;var i=new w.s(n,r),o=new w.p({map:t,side:w.k,transparent:!0}),s=new w.o(i,o);s.position.set(0,0,n/2-.1),s.rotation.y=Math.PI,a.props.box.add(s)}},i.unloadImage=function(){i.grid.visible=!1},i.colorCellFromPixel=function(e,t,a,n,r){var i=(r=r.getObjectByName("color panels")).children[r.children.length-t-1],o=4*(a+e.width*n),s=e.data[o]/255,l=e.data[o+1]/255,c=e.data[o+2]/255,d=e.data[o+3]/255;for(var h in i.children){p(h,i.children[h])}function p(e,t){y.a.delayedCall(.1*e+Math.random(),(function(){t.material.color.setRGB(s,l,c),t.material.opacity=d}))}},n=e.grid_size.width,r=e.grid_size.height,i.ceiling=new w.l,i.floor=new w.l,i.wall_right=new w.l,i.wall_left=new w.l,i.grid=new w.l,i.grid.add(i.ceiling,i.floor,i.wall_right,i.wall_left),i.grid.position.set(0,-r/2,0),i.grid.visible=!1,e.box.add(i.grid),i.ceiling.userData={width:n},i.floor.userData={width:n},i.wall_right.userData={width:r},i.wall_left.userData={width:r},i.ceiling.position.set(0,r,0),i.wall_right.rotation.z=Math.PI/2,i.wall_right.position.set(n/-2,r/2,(n-r)/2),i.wall_left.rotation.z=Math.PI/2,i.wall_left.position.set(n/2,r/2,(n-r)/2),i.grid.children){var s=i.grid.children[o].userData.width;i.grid.children[o].add(i.constructColorPanels(s))}var l=new w.s(n,r),d=new w.p({color:"black",side:w.k});return i.screen=new w.o(l,d),i.screen.position.set(0,0,n/2-.1),i.screen.rotation.y=Math.PI,e.box.add(i.screen),i}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.grid.visible=!0,this.loadImage()}},{key:"componentDidUpdate",value:function(e,t){this.grid.visible=!0,this.props.image_src?e.image_src!=this.props.image_src&&this.loadImage():this.unloadImage()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("canvas",{ref:"image_loader",className:"image-loader",width:this.props.grid_size.width,height:this.props.grid_size.height}),o.a.createElement("img",{ref:"image",style:{display:"none"},src:this.props.image_src}))}}]),a}(o.a.Component),x=a(124),_=a.n(x),O=(a(148),a(60),a(78)),E=(a(88),a(11)),k=(a(89),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).state={grid_size:{width:18,height:12,depth:8}},n.animate=function(e){requestAnimationFrame(n.animate),n.renderer.render(n.scene,n.camera)},n.addToScene=function(e){n.scene.add(e)};n.renderer=new w.E({antialias:!0,alpha:!0}),n.renderer.setPixelRatio(1.333),n.renderer.shadowMapEnabled=!0,n.scene=new w.w,n.camera=new w.r(40,1.333,1,100),n.camera.userData={prevPosition:new w.D,prevRotation:new w.D},n.camera.position.set(0,0,-16),n.camera.lookAt(0,0,0),n.scene.add(n.camera);var r=new w.a("white",.15);n.scene.add(r);var i=new w.c(n.state.grid_size.width,n.state.grid_size.height,n.state.grid_size.depth),o=new w.q({color:"white",opacity:0,transparent:!0});return n.box=new w.o(i,o),n.box.position.set(0,0,0),n.scene.add(n.box),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.renderer.setSize(this.refs.component.clientWidth,this.refs.component.clientHeight),this.refs.component.appendChild(this.renderer.domElement),this.animate()}},{key:"componentDidUpdate",value:function(e,t){}},{key:"render",value:function(){return o.a.createElement("div",{ref:"component",className:"stage"},o.a.createElement(j,{box:this.box,image_src:this.props.src,grid_size:this.state.grid_size}))}}]),a}(o.a.Component)),C=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(d.a)(a,[{key:"render",value:function(){return o.a.createElement("video",{src:this.props.src,autoPlay:!0,muted:!0,loop:!0})}}]),a}(o.a.Component),D=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(d.a)(a,[{key:"render",value:function(){return o.a.createElement("img",{src:this.props.src})}}]),a}(o.a.Component),z=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={root:"./portfolio"},e.renderMedia=function(){switch(e.props.type){case"stage":return o.a.createElement(k,{src:e.state.root+e.props.src});case"video":return o.a.createElement(C,{src:e.state.root+e.props.src});default:return o.a.createElement(D,{src:e.state.root+e.props.src})}},e}return Object(d.a)(a,[{key:"render",value:function(){return o.a.createElement("div",{ref:"component",className:"media"+(this.props.type?" media--"+this.props.type:"")},this.renderMedia())}}]),a}(o.a.Component),P=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={active_index:0},e.onSlideClick=function(t){e.setState({active_index:t})},e}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.slides=new _.a(this.refs.slides,{contain:!0,on:{change:function(t){e.setState({active_index:t})}}})}},{key:"componentDidUpdate",value:function(){this.slides.resize()}},{key:"render",value:function(){var e=[];for(var t in this.props.data)e.push(o.a.createElement("button",{className:"slide",onClick:this.onSlideClick.bind(this,t)},o.a.createElement("h3",null,this.props.data[t].title),o.a.createElement("p",{className:"tech"},this.props.data[t].tech)));return o.a.createElement("div",{ref:"component",className:"carousel"+(this.state.active_index>-1?" carousel--show-details":"")},this.props.box?o.a.createElement(j,{box:this.props.box,image_src:this.state.active_index>-1?this.props.data[this.state.active_index].image:null,grid_size:this.props.grid_size}):o.a.createElement("div",{className:"carousel__content"},o.a.createElement("div",{className:"carousel__content-image"},o.a.createElement(z,{type:this.props.use_stage?"stage":"",src:this.props.data[this.state.active_index].image})),this.props.data[this.state.active_index].description?o.a.createElement("div",{className:"carousel__content-text"},o.a.createElement("h3",null,this.props.data[this.state.active_index].title),o.a.createElement("p",null,this.props.data[this.state.active_index].description),o.a.createElement("p",null,o.a.createElement("strong",null,"Role:")," ",this.props.data[this.state.active_index].role),this.props.data[this.state.active_index].url?o.a.createElement("a",{target:"_blank",href:this.props.data[this.state.active_index].url},"View"):null):null),o.a.createElement("div",{ref:"slides",className:"slides"},e))}}]),a}(o.a.Component),M=a(128),S=a(3),A=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).constructGridCurves=function(e,t,a){for(var n={horizontals:[],verticals:[],concat:[]},r=0;r<t;r++){var i=new w.D(-e/2,r-t/2,-a/2),o=new w.D(e/2,r-t/2,-a/2),s=new w.D(e/2,r-t/2,a/2),l=new w.D(-e/2,r-t/2,a/2);(c=new w.g).add(new w.m(i,o)),c.add(new w.m(o,s)),c.add(new w.m(s,l)),c.add(new w.m(l,i)),n.horizontals[r]=c}for(r=0;r<e;r++){i=new w.D(r-e/2,-t/2,-a/2),o=new w.D(r-e/2,t/2,-a/2),s=new w.D(r-e/2,t/2,a/2),l=new w.D(r-e/2,-t/2,a/2);(c=new w.g).add(new w.m(i,o)),c.add(new w.m(o,s)),c.add(new w.m(s,l)),c.add(new w.m(l,i)),n.verticals[r]=c}for(r=0;r<a;r++){var c;i=new w.D(e/2,t/2,r-a/2),o=new w.D(e/2,-t/2,r-a/2),s=new w.D(-e/2,-t/2,r-a/2),l=new w.D(-e/2,t/2,r-a/2);(c=new w.g).add(new w.m(i,o)),c.add(new w.m(o,s)),c.add(new w.m(s,l)),c.add(new w.m(l,i)),n.verticals[r+e]=c}return n.concat=n.horizontals.concat(n.verticals),n},n.randomNumberGenerator=function(e,t){return e+Math.random()*(t-e)},n.vertexShader=function(){return"\n            attribute float scale;\n            attribute float opacity;\n\n            // attributes can only be passed to vertex shaders.  but variables can be sent from vertex to fragment using varying\n            varying float vOpacity;\n\n            void main() {\n\n                vOpacity = opacity;\n\n                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n                gl_PointSize = scale * ( 300.0 / - mvPosition.z );\n\n                gl_Position = projectionMatrix * mvPosition;\n\n            }\n        "},n.fragmentShader=function(){return"\n            uniform vec3 color;\n            \n            varying float vOpacity;\n\n            void main() {\n                // this is what makes it a circle\n                if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;\n\n                gl_FragColor = vec4( color, vOpacity );\n\n            }\n        "},n.initAni=function(){var e=n.particles.geometry.attributes.position.array,t=n.particles.geometry.attributes.scale.array;for(var a in n.grid.concat)for(var r=n.grid.concat[a].getSpacedPoints(500),i=500*a,o=0;o<500;o++){var s,l,c=.02*o+.1*a;y.a.from(t,.5,(s={},Object(S.a)(s,i+o,0),Object(S.a)(s,"delay",c),Object(S.a)(s,"yoyo",!0),Object(S.a)(s,"repeat",-1),Object(S.a)(s,"repeatDelay",1),Object(S.a)(s,"onUpdate",(function(){n.particles.geometry.attributes.scale.needsUpdate=!0})),s));var d=3*i+3*o;y.a.to(e,.5,(l={},Object(S.a)(l,d,r[o].x),Object(S.a)(l,d+1,r[o].y),Object(S.a)(l,d+2,r[o].z),Object(S.a)(l,"delay",c),Object(S.a)(l,"yoyo",!0),Object(S.a)(l,"repeat",-1),Object(S.a)(l,"repeatDelay",1),Object(S.a)(l,"onUpdate",(function(){n.particles.geometry.attributes.position.needsUpdate=!0})),l))}},n.restingAni=function(){var e=n.particles.geometry.attributes.position.array;for(var t in n.grid.concat)for(var a=n.grid.concat[t].getSpacedPoints(500),r=500*t,i=0;i<500;i++){var o,s=3*r+3*i;y.a.to(e,.5,(o={},Object(S.a)(o,s,a[i].x),Object(S.a)(o,s+1,a[i].y),Object(S.a)(o,s+2,a[i].z),Object(S.a)(o,"delay",.02*i+.5*t),Object(S.a)(o,"yoyo",!0),Object(S.a)(o,"repeat",-1),Object(S.a)(o,"repeatDelay",2),Object(S.a)(o,"onUpdate",(function(){n.particles.geometry.attributes.position.needsUpdate=!0})),o))}},n.grid=n.constructGridCurves(e.grid_size.width,e.grid_size.height,e.grid_size.depth);var r=e.grid_size.width*e.grid_size.height*e.grid_size.depth,i=new Float32Array(1500*r),o=new Float32Array(500*r),s=new Float32Array(500*r);for(var l in n.grid.concat)for(var d=n.grid.concat[l].getSpacedPoints(500),h=500*l,p=0;p<500;p++){var u=3*h+3*p;i[u]=d[p].x+n.randomNumberGenerator(-.5,.5),i[u+1]=d[p].y+n.randomNumberGenerator(-.5,.5),i[u+2]=d[p].z+n.randomNumberGenerator(-.5,.5),o[h+p]=n.randomNumberGenerator(.2,.5),s[h+p]=n.randomNumberGenerator(.2,1)}var m=new w.e;m.setAttribute("position",new w.d(i,3)),m.setAttribute("scale",new w.d(o,1)),m.setAttribute("opacity",new w.d(s,1));var g=new w.x({uniforms:{color:{value:new w.f("grey")}},vertexShader:n.vertexShader(),fragmentShader:n.fragmentShader(),transparent:!0});return n.particles=new w.u(m,g),n.props.box.add(n.particles),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){this.initAni()}},{key:"render",value:function(){return null}}]),a}(o.a.Component),T=a(2),I=(a(285),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;Object(c.a)(this,a),(n=t.call(this,e)).state={grid_size:{width:16,height:12,depth:16}},n.calculateCameraPosition=function(e){var t={x:0,y:n.props.data.position.rotation-.34,z:0},a=n.box.localToWorld(e);console.log(a),n.props.functions.moveCameraTo(a,t)};var r=new w.c(n.state.grid_size.width,n.state.grid_size.height,n.state.grid_size.depth),i=new w.q({color:"white",side:w.b,opacity:.5,transparent:!0});return n.box=new w.o(r,i),n.box.position.set(e.data.position.x,e.data.position.y,e.data.position.z),n.box.rotation.y=e.data.position.rotation,n.box.receiveShadow=!0,e.functions.addToScene(n.box),n.light=new w.t("black",1,16),n.light.castShadow=!0,n.light.position.set(e.data.position.x,e.data.position.y,e.data.position.z),e.functions.addToScene(n.light),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=[new w.f("orange"),new w.f("purple"),new w.f("blue"),new w.f("red")],t=this.props.index;new T.d({repeat:-1}).to(this.light.color,5,{r:e[t%e.length].r,g:e[t%e.length].g,b:e[t%e.length].b}).to(this.light.color,5,{r:e[(t+1)%e.length].r,g:e[(t+1)%e.length].g,b:e[(t+1)%e.length].b}).to(this.light.color,5,{r:e[(t+2)%e.length].r,g:e[(t+2)%e.length].g,b:e[(t+2)%e.length].b}).to(this.light.color,5,{r:e[(t+3)%e.length].r,g:e[(t+3)%e.length].g,b:e[(t+3)%e.length].b}).to(this.light.color,5,{r:0,g:0,b:0})}},{key:"componentDidUpdate",value:function(e){var t=new w.A(this.props.data.title,{font:this.props.font,size:1,height:.8,curveSegments:8,bevelEnabled:!0,bevelThickness:.05,bevelSize:.05,bevelOffset:.01,bevelSegments:1}),a=new w.q({color:"white"}),n=new w.o(t,a);n.position.set(this.state.grid_size.width/-2+1,this.state.grid_size.height/-2,this.state.grid_size.depth/-2+.5),this.box.add(n),this.props.isActive&&this.calculateCameraPosition(new w.D(-2,-2,9))}},{key:"render",value:function(){return o.a.createElement("div",{ref:"component",className:"box"+(this.props.isActive?" box--active":"")},o.a.createElement(A,{box:this.box,grid_size:this.state.grid_size}))}}]),a}(o.a.Component)),N=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(e){var n;(Object(c.a)(this,a),(n=t.call(this,e)).state={grid_size:{width:16,height:12,depth:16},font:null,datgui:{position:{x:0,y:16,z:0},lookAt:{x:0,y:4,z:0}}},n.animate=function(e){requestAnimationFrame(n.animate),n.renderer.render(n.scene,n.camera)},n.addToScene=function(e){n.scene.add(e)},n.moveCameraTo=function(e,t){n.camera.userData.prevPosition.copy(n.camera.position),n.camera.userData.prevRotation.copy(n.camera.rotation),T.e.to(n.camera.position,2,{x:e.x,y:e.y,z:e.z,ease:T.a.easeInOut}),T.e.to(n.camera.rotation,2,{x:t.x,y:t.y,z:t.z,ease:T.a.easeOut,delay:2})},n.onUpdateDatGui=function(e){n.setState((function(t){return{datgui:Object(M.a)({},t.datgui,{},e)}})),n.camera.position.set(e.position.x,e.position.y,e.position.z),n.camera.lookAt(e.lookAt.x,e.lookAt.y,e.lookAt.z)},n.renderer=new w.E({antialias:!0}),n.renderer.setPixelRatio(window.devicePixelRatio),n.renderer.setSize(window.innerWidth,window.innerHeight),n.renderer.shadowMapEnabled=!0,n.scene=new w.w,n.camera=new w.r(40,window.innerWidth/window.innerHeight,1,100),n.camera.userData={prevPosition:new w.D,prevRotation:new w.D},n.camera.position.set(3,16,4),n.camera.lookAt(3,0,2),n.scene.add(n.camera),e.controls)&&new O.a(n.camera,n.renderer.domElement).target.set(0,4,0);var r=new w.a("white",.15);return n.scene.add(r),n}return Object(d.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.refs.component.appendChild(this.renderer.domElement),(new w.j).load("fonts/helvetiker.json",(function(t){e.setState({font:t})})),this.animate()}},{key:"componentDidUpdate",value:function(e,t){if(this.props.isMenuOpen&&!e.isMenuOpen){this.moveCameraTo({x:0,y:42,z:0},{x:-1.570795326794897,y:0,z:0})}else!this.props.isMenuOpen&&e.isMenuOpen&&this.props.match.params.box_title==e.match.params.box_title&&(console.log("did update",t,this.state),this.camera.position.set(this.camera.userData.prevPosition.x,this.camera.userData.prevPosition.y,this.camera.userData.prevPosition.z),this.camera.rotation.set(this.camera.userData.prevRotation.x,this.camera.userData.prevRotation.y,this.camera.userData.prevRotation.z))}},{key:"render",value:function(){var e=[];for(var t in E){if(this.props.match)var a=this.props.match.params.box_title&&E[t].title.toLowerCase()==this.props.match.params.box_title.toLowerCase()&&!this.props.isMenuOpen;e.push(o.a.createElement(I,{key:"box"+t,index:parseInt(t),isActive:a,data:E[t],font:this.state.font,functions:{addToScene:this.addToScene,moveCameraTo:this.moveCameraTo}}))}this.state.datgui;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{ref:"component",className:"scene"},e))}}]),a}(o.a.Component),G=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(N,null),o.a.createElement("h1",null,"Betina Dalope"),o.a.createElement("p",null,"Philadelphia, PA"),o.a.createElement("h2",null,"Contact"),o.a.createElement("p",null,o.a.createElement("strong",null,"Email: ")," betina.devwork@gmail.com"),o.a.createElement("p",null,o.a.createElement("strong",null,"LinkedIn: "),"https://www.linkedin.com/in/mbetina/"),o.a.createElement("h2",null,"Work"),o.a.createElement(P,{data:E[1].projects,use_stage:!0}),o.a.createElement("h2",null,"Prototypes"),o.a.createElement(P,{data:E[2].projects,use_stage:!0}),o.a.createElement("h2",null,"Music and Sound Design"))}}]),a}(o.a.Component),R=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={},e}return Object(d.a)(a,[{key:"render",value:function(){var e=[];for(var t in this.props.data)e.push(o.a.createElement("li",null,o.a.createElement(z,this.props.data[t])));return o.a.createElement("div",{ref:"component",className:"gallery"},o.a.createElement("ul",null,e))}}]),a}(o.a.Component),F=function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(d.a)(a,[{key:"componentDidMount",value:function(){document.getElementsByTagName("BODY")[0].classList.add("basic-page")}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("h1",null,"Betina Dalope"),o.a.createElement("p",null,"Philadelphia, PA"),o.a.createElement("h2",null,"Contact"),o.a.createElement("p",null,o.a.createElement("strong",null,"Email: ")," betina.devwork@gmail.com"),o.a.createElement("p",null,o.a.createElement("strong",null,"LinkedIn: "),"https://www.linkedin.com/in/mbetina/"),o.a.createElement("h2",null,"Work"),o.a.createElement(P,{data:E[1].projects}),o.a.createElement("h2",null,"Prototypes"),o.a.createElement("p",null,"using Three.js, Gsap, React.js, and Sass (CSS)"),o.a.createElement(R,{data:E[2].gallery}))}}]),a}(o.a.Component),B=(a(286),function(e){Object(p.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).state={isMenuOpen:!1},e.onMenuToggleClick=function(t){e.setState({isMenuOpen:!e.state.isMenuOpen})},e}return Object(d.a)(a,[{key:"render",value:function(){var e=this,t=[];for(var a in E)t.push(o.a.createElement("li",null,o.a.createElement(u.b,{to:"/initial-scene"+E[a].title.toLowerCase(),onClick:this.onMenuToggleClick},E[a].title)));return o.a.createElement(u.a,null,o.a.createElement(m.c,null,o.a.createElement(m.a,{exact:!0,path:"/",component:F}),o.a.createElement(m.a,{exact:!0,path:"/portfolio",component:F}),o.a.createElement(m.a,{exact:!0,path:"/initial-scene",render:function(a){return o.a.createElement(o.a.Fragment,null,o.a.createElement("nav",{className:"menu"+(e.state.isMenuOpen?" menu--open":"")},o.a.createElement("h1",{id:"menu-title",className:"u-sr-only"},"Menu"),o.a.createElement("button",{className:"toggle",onClick:e.onMenuToggleClick},"Menu"),o.a.createElement("ul",{"aria-labelledby":"menu-title"},t)),o.a.createElement(N,Object.assign({},a,{isMenuOpen:e.state.isMenuOpen,controls:!0})))}}),o.a.createElement(m.a,{path:"/test-1",component:g}),o.a.createElement(m.a,{path:"/test-2",component:f}),o.a.createElement(m.a,{path:"/page",component:G}),o.a.createElement(m.a,{path:"/initial-scene/:box_title",render:function(t){return o.a.createElement(N,Object.assign({},t,{isMenuOpen:e.state.isMenuOpen}))}})))}}]),a}(o.a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(o.a.createElement(B,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},88:function(e,t,a){}},[[131,1,2]]]);
//# sourceMappingURL=main.4f01881a.chunk.js.map