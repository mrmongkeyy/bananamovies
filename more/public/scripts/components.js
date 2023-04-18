const header = makeElement('header',{
	style:`
		background:white;
		width:100%;
		display:flex;
		align-items:center;
		justify-content:space-around;
		flex-wrap:wrap;
	`,
	innerHTML:`
		<div
		style="
			padding:10px;
			display:flex;
			align-items:center;
			flex-direction:column;
		"
		>	
			<img src=/file?fn=happy-face.png
			style="
				width:32px;
				height:32px;
			"
			>
			<span
			style="
				font-size:14px;
				font-weight:bold;
			"
			>NontonAjaUdah</span>
		</div>
		<div
		style="
			padding:10px;
			font-size:20px;
			display:flex;
			align-items:center;
		"
		>
		  <div
			style="
			margin-left:10px;
			"
		  >
		    <input
		    style="
		      background:white;
			  
			  padding:10px;
			  border:1.5px solid black;
		    "
		    placeholder='Cari film...'
		    ><button
		    style="
		      background:black;
		      color:white;
		      margin-left:5px;
			  padding:10px;
			  border:1.5px solid black;
		    "
		    >Go</button>
		  </div>
		</div>
	`,
	onadded(){
		searchHandling(this);
	}
});

const searchHandling = function(el){
	el.find('button').onclick = ()=>{
		const input = el.find('input');
		if(input.value!=''){
			const result = [];
			find('header').contentBackup.forEach(item=>{
				if(item.title.toLowerCase().indexOf(input.value)!=-1)result.push(item);
			})
			find('#container').innerHTML = '';
			displayContent(result,false);
			//handline no result.
			if(result.length===0){
				find('#container').innerHTML = `
					<div
					style="
						display:flex;
						height:100%;
						align-items:center;
					"
					>
						<span
						style="
							padding:10px;
							background:white;
						"
						>Hasil tidak ditemukan!</span>
					</div>
				`
			}
		}else {find('#container').innerHTML = '';displayContent(find('header').contentBackup,false)};
	}
}

const category = makeElement('div',{
	style:`
		background:teal;
		color:white;
		width:100%;
		height:10%;
		overflow:auto;
		display:flex;
		font-size:20px;
		align-items:center;
		justify-content:space-between;
	`,
	onadded(){
		const category = ['Rumah','Aksi','Pertualangan','Animasi','Anime','Komedi','Drama','Sejarah','Horror','Populer','FiksiIlmiah','Thriller','SeriesBarat'];
		category.forEach(item=>{
			this.addChild(makeElement('div',{
				style:`
					margin:0 10px;
					cursor:pointer;
				`,
				innerHTML:`
					<span id=${item}>${item}</span>
				`,
				itemTo:item,
				onclick(){
					this.changeCategory();
				},
				changeCategory(){
					find('content').remove();
					find('main').addChild(content(this.itemTo));
				}
			}))
		})
}	
	
})

const content = function(category){
	return makeElement('content',{
		style:`
			background:black;
			height:100%;
			width:100%;
			display:flex;
			align-items:center;
			justify-content:center;
			overflow:auto;
		`,
		onadded(){
			//requesting the content.
			this.addChild(makeElement('div',{
				id:'container',
				style:`
					width:90%;
					height:90%;
					padding:10px;
					display:flex;
					flex-wrap:wrap;
					justify-content:center;
				`,
			}))
			this.addChild(openLoading('Sedang memuat konten...'));
			const loadingDiv = this.find('#loadingDiv');
			cOn.get({
				url:`/showContent?category=${category}`,
				onload(r){
					loadingDiv.remove();
					indicatorWorkingHandle(category);
					displayContent(JSON.parse(r.target.responseText));
				}
			});
		}
	})
}

const indicatorWorkingHandle = function(category){
	if(find('span.selectedCategory'))find('span.selectedCategory').classList.remove('selectedCategory');
	find(`span#${category}`).classList.add('selectedCategory');
}

const displayContent = function(contents,save=true){
	if(save)find('header').contentBackup = contents;
	contents.forEach((content,i)=>{
		find('#container').addChild(makeContentBox(content,i));
	})
}

const makeContentBox = function(content,index){
	return makeElement('div',{
		index,
		style:`
			background:white;
			display:flex;
			align-items:center;
			justify-content:center;
			flex-direction:column;
			margin:5px;
			width:152px;
			max-height:300px;
			cursor:pointer;
		`,
		content,
		innerHTML:`
			<div
			style="
				width:100%;
				display:flex;
				justify-content:center;
				height:100%;
			">
				<img
				src=${content.thumbnail}
				style="
					object-fit:cover;
					background:white;
					width:auto;
					height:auto;
				"
				>
			</div>			
			<div
			style="
				width:100%;
				height:100%;
				display:flex;
				align-items:center;
				justify-content:${content.title.length>40?'flex-start':'center'};
				flex-direction:column;
				overflow:auto;
			"
			>
				<span
				style="
				padding:5px;
				width:90%;
				font-weight:bold;
				text-align:center;
				"
				>${content.title}</span>
			</div>
		`,
		onadded(){
			this.findall('div').forEach(div=>{
				div.onclick = ()=>{
					processLink(this.content);
				}
			})
		}
	})
}

const getSource = function(index){
  const loading = openLoading('Memuat data...');
  find('main').addChild(loading);
  cOn.get({
    url:`/getSrc?link=${find('header').contentBackup[index].link}`,
    onload(r){
      if(this.getJSONResponse().valid){
        loading.remove();
        processLink(this.getJSONResponse().link);  
      }
    }
  });
}

const processLink = function(content){
  find('main').addChild(makeElement('div',{
    style:`
      position:absolute;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgb(0,0,0,0.5);
      display:flex;
      align-items:center;
      flex-direction:column;
    `,
    onadded(){
			this.addChild(makeElement('div',{
				removable:this,
				style:`
					background:white;
					border-radius:0 0 10px 10px;
				`,
				id:'bar-video',
				innerHTML:`
					<div
					style="
						padding:20px;
						display:flex;
						justify-content:center;
						align-items:center;
						flex-direction:column;
					"
					>
						<div
						style="
							margin-bottom:10px;
							width:100%;
						"
						>
							<span
							style="
								font-size:20px;
								width:100%;
								text-align:left;
							"
							>${content.title}</span>
						</div>
						<div
						style="
							width:100%;
							display:inline-block;
						"
						>
							<div
							style="
								width:100%;
								position:relative;
							"
							>
								<iframe
								src=${content.linkEmbeded.replace('false','true')}
								style="
									border:none;
									overflow:hidden;
									background:black;
									width:100%;
								"
								></iframe>
								
							</div>
						</div>
						<div
						style="
							width:100%;
							margin-top:10px;
							display:flex;
							align-items:center;
							justify-content:center;
						"
						>
							<div
							style="
								font-size:15px;
								font-weight:bold;
								width:50%;
								overflow:auto;
							"
							>
								<div>
									<span>Rating: ${content.rating}</span>
								</div>
								<div>
									<span>Duration: ${content.duration}</span>
								</div>
							</div>
							<div
							style="
								width:50%;
								text-align:right;
								display:flex;
								justify-content:flex-end;
								align-items:center;
								flex-wrap:wrap;
							"
							>
								<img src=/file?fn=expand.png
								style="
									width:32px;
									height:32px;
									margin-right:5px;
									cursor:pointer;
								"
								id=fullScreenToogle
								>
								<span
								style="
									padding:10px;
									background:black;
									color:white;
									border-radius:5px;
									cursor:pointer;
								"
								id=closeToogle
								>Tutup</span>
							</div>
						</div>
					</div>
				`,
				onadded(){
					this.find('#fullScreenToogle').onclick = ()=>{
						this.find('iframe').requestFullscreen();
					}
					this.find('#closeToogle').onclick = ()=>{
						this.removable.remove();
					}
				}
			}))
    }
  }))
}

const openLoading = function(loadingmsg,added){
	return makeElement('div',{
		id:'loadingDiv',
		style:`
			position:absolute;
			top:0;
			left:0;
			width:100%;
			height:100%;
			background:rgb(0,0,0,0.5);
			display:flex;
			align-items:center;
			justify-content:center;
		`,
		innerHTML:`
			<div
			style="
				background:white;
				padding:10px;
			"
			>
				<span>${loadingmsg}</span>
			</div>
		`,
		onadded(){
			if(added)added(this);
		}
	})
}
























