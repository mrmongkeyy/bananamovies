document.body.onload = function(){
	document.body.style.margin = '0';
	const main = makeElement('main',{
		style:`
			display:flex;
			width:100%;
			height:100%;
			background:teal;
			position:absolute;
			flex-direction:column;
			font-family:monospace;
			align-items:center;
		`,
		onadded(){
			this.addChild(header);
			this.addChild(category);
			this.addChild(content('Rumah'));
			this.addChild(makeElement('div',{
				id:'anouncePop',
				style:`
					position:absolute;
					width:100%;
					height:100%;
					background:rgb(0,0,0,0.5);
					display:flex;
					justify-content:center;
					align-items:flex-start;
				`,
				innerHTML:`
					<div
					style="
						background:white;
						padding:10px;
						max-width:50%;
					"
					>
						<div
						style=font-size:20px;
						>
							<span>Selamat Datang Di NontonAjaUdah!</span>
						</div>
						<div
						style=margin-top:10px;
						>	
							<div>
								<span>Web ini dijual. Web ini, semua akan menjadi milik anda!<br>
									Web sudah playable, memiliki banyak kontent. Kontent bisa<br> ditambah. Baik secara manual, ataupun otomasi, saya akan<br> melakukannya.</span>
							</div>
							<div
							style="
								margin-top:10px;
							"
							>
								<span>
									Terimakasih, tertanda Gema.
								</span>
							</div>
						</div>
						<div
						style="
							margin-top:20px;
							text-align:right;
							margin-bottom:10px;
						"
						>
							<span id=buttonclose
							style="
								background:Black;
								padding:10px;
								color:white;
								cursor:pointer;
							">Lanjutkan</span>
						</div>
					</div>
				`,
				onadded(){
					this.find('#buttonclose').onclick = function(){
						find('#anouncePop').remove();
					};
				}
			}))
		}
	})
	document.body.addChild(main);
}
