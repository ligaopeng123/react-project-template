import 'dart:async';
export 'tool/sp_util.dart' show SpUtil;
export 'tool/perm_util.dart' show PermUtil;
export 'tool/log_util.dart' show LogUtil;
export 'tool/tips_util.dart' show Tips;
export 'tool/encrypt_utils.dart' show encode;

/// 是否是手机号
bool isPhone(String value) {
  return RegExp(r"^1(3|4|5|7|8)\d{9}$").hasMatch(value);
}

/// 版本号比较，version1 大于 version2时返回true
bool compareVersion(String version1, String version2) {
  num toNum(String vStr) {
    List<String> c = vStr.trim().split('.');
    if (c.length < 3) c.add('0');
    const r = ['0000', '000', '00', '0', ''];
    for (var i = 0; i < c.length; i++) {
      int len = c[i].length;
      c[i] = r[len] + c[i];
    }
    return int.parse(c.join(''));
  }

  num newVersion1 = toNum(version1);
  num newVersion2 = toNum(version2);

  return newVersion1 > newVersion2;
}
/// 版本号比较，version1 1.2.1 version2 1.1.0 时返回true 是否是个大版本
bool forceUpgrade(String version1, String version2) {
  List<String> toNum(String vStr) {
    List<String> c = vStr.trim().split('.');
    if (c.length < 3) c.add('0');
    return c;
  }

  List<String> newVersion1 = toNum(version1);
  List<String> newVersion2 = toNum(version2);
  for (var i = 0; i < newVersion1.length - 1; i++) {
    if (int.parse(newVersion1[i]) > int.parse(newVersion2[i])) {
      return true;
    }
  }
  return false;
}

/**
 * 判断表单是否为空
 */
bool checkTextEmpty(str) {
  return str != null && str is String && str.isEmpty;
}

/**
 * 判断字符串是否为空
 */
bool isTextEmpty(str) {
  if (checkTextEmpty(str) || str == null || str == '') {
    return true;
  } else {
    return false;
  }
}

/**
 * 将map类型数据转为list
 */
List<Map<String, dynamic>> mapToOpts(Map _map) {
  return _map.entries.toList().map((e) {
    return {'label': e.value.toString(), 'value': e.key};
  }).toList();
}
