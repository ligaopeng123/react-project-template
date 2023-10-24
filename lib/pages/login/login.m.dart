/// 用户登录接口返回类型
class LoginMobile {
  int? code;
  String? msg;
  LoginMobileData? data;

  LoginMobile({this.code, this.msg, this.data});

  LoginMobile.fromJson(Map<String, dynamic> json) {
    code = json['code'];
    msg = json['msg'];
    data = json['data'] != null ? LoginMobileData.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['code'] = code;
    data['msg'] = msg;
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    return data;
  }
}

class LoginMobileData {
  String? access_token; // token数据
  String? userId;
  String? phone; // 手机号
  String? username; // 用户名
  String? email; // 邮箱
  String? realName; // 真实姓名
  String? tenantName; // 企业名称
  String? orgName; // 组织管理
  String? orgCode; // 组织code
  String? orgId; // 组织ID
  String? roleId; // 角色id
  String? roleHighestLevel; // 角色等级
  String? accountType; // 账号类型
  String? mainAccount; // 主账号
  String? tenant; // 租户信息

  LoginMobileData(
      {
        this.access_token,
        this.tenant,
        this.userId,
        this.phone,
        this.username,
        this.email,
        this.realName,
        this.tenantName,
        this.orgName,
        this.orgCode,
        this.orgId,
        this.roleId,
        this.roleHighestLevel,
        this.accountType,
        this.mainAccount,
      });

  LoginMobileData.fromJson(Map<String, dynamic> json) {
    access_token = json['access_token'];
    tenant = json['tenant'];
    userId = json['userId'];
    phone = json['phone'];
    username = json['username'];
    email = json['email'];
    realName = json['realName'];
    tenantName = json['tenantName'];
    orgName = json['orgName'];
    orgCode = json['orgCode'];
    orgId = json['orgId'];
    roleId = json['roleId'];
    roleHighestLevel = json['roleHighestLevel'];
    accountType = json['accountType'];
    mainAccount = json['mainAccount'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['access_token'] = access_token;
    data['tenant'] = tenant;
    data['userId'] = userId;
    data['phone'] = phone;
    data['username'] = username;
    data['email'] = email;
    data['realName'] = realName;
    data['tenantName'] = tenantName;
    data['orgName'] = orgName;
    data['orgCode'] = orgCode;
    data['orgId'] = orgId;
    data['roleId'] = roleId;
    data['roleHighestLevel'] = roleHighestLevel;
    data['accountType'] = accountType;
    data['mainAccount'] = mainAccount;
    return data;
  }
}


/**
 * 验证码数据
 */
class LoginMobileCaptcha {
  String? image;
  String? imageId;
  String? inputCode;

  LoginMobileCaptcha(
      {this.image,
        this.imageId,
        this.inputCode,
        });

  LoginMobileCaptcha.fromJson(Map<String, dynamic> json) {
    image = json['image'];
    imageId = json['imageId'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['image'] = image;
    data['imageId'] = imageId;
    return data;
  }
}
