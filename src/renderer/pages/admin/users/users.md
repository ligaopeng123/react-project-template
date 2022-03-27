# user类型
enum USER {
    # 唯一标识 后台生成
    id: string,
    # 名称
	name: string,
	# 备注
	desc: string,
	# 密码
	password: string,
	# 关联的机构
	organization: string
};
# list类型
enum USERS {
    # 用户list表
    data:[USER],
    # 条数
    total: Number,
    # 为0是OK的
    code: Number,
    # 返回的错误或者正确对的信息
    codeMessage: string,
}

# 功能  下发类型及数据  响应格式
# 获取表格 下发为空
/nx_api/users/list
list users post {
    # 当前页
    current: 1,
    # 分页条数
    pageSize: 20
} USERS;
# 查询
/nx_api/users/list
search users post {
    # 当前页
    current: 1,
    # 分页条数
    pageSize: 20,
    # 用户名
    name: string
} USERS;
# 新增接口路径
/nx_api/users/create
#add user post USER USERS；
# 编辑接口路径
/nx_api/users/edit
#edit user post USER USERS；
# 删除接口路径
/nx_api/users/del
#del post user USER.id USERS；