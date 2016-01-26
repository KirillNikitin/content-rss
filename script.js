(function() {
	$.ajax({
	  url: 'https://ajax.googleapis.com/ajax/services/feed/load',
	  jsonp: "callback",
	  dataType: "jsonp",
	  data: {
		  q: encodeURI('https://www.readability.com/rseero/latest/feed'),
		  v: '1.0'
	  },
	  success: function(data){
		  drawContent(data);
		}
	});
	function drawContent(data){
		var num = data.responseData.feed.entries.length;
		var enries = data.responseData.feed.entries;
		for(var i=0; i<num; i++){
			drawBlock(enries[i]);
		}
	}
	function drawBlock(blockData){
		var infoBlock = $("<div class='infoBlock' />")
		$("#infoContainer").append(infoBlock);
		infoBlock.append($("<div class='shortDesc'>"+blockData.contentSnippet+"</div>"))
		infoBlock.append($("<div class='longDesc'>"+blockData.content+"</div>"))
		infoBlock.append($("<a href="+blockData.link+" onclick='event.stopPropagation()'>"+blockData.title+"</a>"))
		infoBlock.append($("<div class='date'>"+blockData.publishedDate+"</div>"))
		clickItem(infoBlock, blockData);
	}
	function clickItem(elem, d){
		elem.on('click', elem, function(){
			var urlParser = function(href){
				href2 = href.split('?');
				lnk = href2[1].slice(4, href2[1].length);
				return lnk;
			}
			$.ajax({
				url: 'https://readability.com/api/content/v1/parser',
				jsonp: "callback",
				dataType: "jsonp",
				data: {
					url: urlParser(d.link),
					token: 'f349cbd173d320972bf52eebda29c8df4d3802ed'
				},				
				success: function(data){
				  PopUpShow(data);
				}				
			})			
		})	
	}
	
})()

function PopUpShow(data){
		$("#popup1").show();
		$(".b-popup-container-content").append($('<div>'+data.content+'</div>'));
		$('.b-popup-container-content').css('max-height', $(window).height() - 50 + 'px');
	}
function PopUpHide(){
		$("#popup1").hide();
		$(".b-popup-container-content").empty();
	}	
