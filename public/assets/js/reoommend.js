// 发送ajax 请求数据 构建模板 并渲染
// 因为我们要多次使用 所以将模板写在js文件中
$.ajax({
    type: 'GET',
    url: '/posts/recommend',
    success: function(res) {
        var temp = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `;

        var str = template.render(temp, { data: res });
        // console.log(str);
        $('#recommend').html(str);
    }
});


// 向服务器端发送请求 索要随机推荐数据
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(response) {
        var randomTpl = `
			{{each data}}
			<li>
			  <a href="detail.html?id={{$value._id}}">
			    <p class="title">{{$value.title}}</p>
			    <p class="reading">阅读({{$value.meta.views}})</p>
			    <div class="pic">
			      <img src="{{$value.thumbnail}}" alt="">
			    </div>
			  </a>
			</li>
			{{/each}}
		`;
        var html = template.render(randomTpl, { data: response });
        $('#randomBox').html(html)
    }
})


// 主页面的分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var navTpl = `
			{{each data}}
			<li>
				<a href="list.html?categoryId={{$value._id}}">
					<i class="fa {{$value.className}}"></i>{{$value.title}}
				</a>
			</li>
			{{/each}}
		`;
        var html = template.render(navTpl, { data: response });
        // $('#navBox').html(html)
        // $('#topNavBox').html(html)
        $('.nav_item').html(html)
    }
})