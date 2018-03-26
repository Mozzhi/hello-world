import Mock from 'mockjs';

Mock.mock('http://g.cn', 
  {
    'course_name|1':[
        '广州风神',
        '北京美松',
        '深圳观澜湖',
    ],
    'team|10':[
        {
            'img|1':"@image('100X100','@color','#fff','@last')",
            'name'     : '@csentence()',
            'age|1-100': 100,
            'color'    : '@color'
        }
    ]
  }
);

Mock.mock('http://c.cn',{
    'success|1': '@boolean',
    'errmsg|1':'@csentence()',
    'code|1':0,
});

Mock.mock('http://m.img',{
    'img_list|10':[
        {
            'name|3'  : ['@cname()','@cname()','@cname()'],
            'id|1-10' : 100,
            'text|3'  : ['@ctitle(5, 10)','@ctitle(5, 10)','@ctitle(5, 10)']
        }
    ]
})

export default Mock;