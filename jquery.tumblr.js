// Should be when the document is ready, check and load.
// MADE BY EAX (eax@eax.dk)

$(document).ready(function (){
	var current_url = jQuery(location).attr('href');
	var regex_url_check = current_url.match("\/blogs\/about");
	var blog_name = "eaxbin"; // YOUR BLOG NAME
	var url = "http://"+blog_name+".tumblr.com/api/read/json?"; 
	
	var oauth = "YOUROAUTHKEY";
	var new_url = "http://api.tumblr.com/v2/blog/eaxbin.tumblr.com/posts?api_key="+oauth;
	
	function empty_holder(){
		$('#headline').empty();
		$('#the_text').empty();
		$('#breadcrumbs').empty();
		$('#answer').empty();
		$('#question').empty();
	}

		$.getJSON(url+'&callback=?&num=50', function(data) {
			$("#ajax_loader").remove();
			
			for(var current in data.posts){
				var post_type = data.posts[current]["type"];
				var timestamp = data.posts[current]["unix-timestamp"];
				var date = data.posts[current].date;
				var post_url = data.posts[current].url;
				var post_id = data.posts[current].id;
				$("#content").addClass(post_id);
				
				console.log("The type is: " + post_type + " and it was posted: " + date);
								
								
				if(post_type.match('.*?regular.*?')){
					empty_holder();
					console.log("This is a regular post");
					
					var title = data.posts[current]["regular-title"];
					var text = data.posts[current]["regular-body"];
					var tags = data.posts[current].tags;
					var breadcrumbs = "Posted: " + date + "<br>Tags: " + tags;
					
					$('#headline').html(title);
					$('#the_text').html(text);
					$('#breadcrumbs').html(breadcrumbs);
					$('#blog_box').clone().appendTo('#blog_holder').css('visibility', 'visible');
					empty_holder();
				} 
				if(post_type.match(".*?answer.*?")){
					empty_holder();
					
					var answer = data.posts[current].answer;
					var question = data.posts[current].question;
					
					$('#question').html(question);
					$('#answer').html(answer);
					$('#blog_box').clone().appendTo('#blog_holder').css('visibility', 'visible');
					empty_holder();
				} 
				if(post_type.match(".*?photo.*?")){
					empty_holder();
					console.log("This is an image");
					
					var title = data.posts[current]["photo-caption"];
					title = title.replace("<p>", "");
					title = title.replace("</p>", "");
					var breadcrumbs = "Posted: " + date + "<br>Tags: " + tags;
					var photo = data.posts[current]["photo-url-400"];
					console.log(title);
					console.log(breadcrumbs);
					console.log(photo);
					
					$('#headline').html(title);
					$('#breadcrumbs').html(breadcrumbs);
					$('#the_text').html("<img src='"+photo+"'>");
					$('#blog_box').clone().appendTo('#blog_holder').css('visibility', 'visible');
					empty_holder();
				}
				
				
				console.log(post_type);
				console.log(data.posts[current]);
				/*console.log(data.posts[current].date);
				console.log(data.posts[current]["regular-body"]);*/
			}
			
		});
});