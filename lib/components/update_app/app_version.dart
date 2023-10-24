class AppVersion {
  bool forceUpdate = false;
  bool upgrade = false;
  String newVersion = '1.0.0';
  String currentVersion = '1.0.0';
  String webVersion = '1.0.0';
  bool webUpgrade = false;
  List<String> versionFeat = [];

  AppVersion(
      {required this.forceUpdate,
      required this.upgrade,
      required this.newVersion,
      required this.currentVersion,
      required this.webVersion,
      required this.webUpgrade,
      required this.versionFeat,
      });

  AppVersion.fromJson(Map<String, dynamic> json) {
    forceUpdate = json['forceUpdate'];
    upgrade = json['upgrade'];
    newVersion = json['newVersion'];
    currentVersion = json['currentVersion'];
    webVersion = json['webVersion'];
    webUpgrade = json['webUpgrade'];
    versionFeat = json['versionFeat'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['forceUpdate'] = this.forceUpdate;
    data['upgrade'] = this.upgrade;
    data['newVersion'] = this.newVersion;
    data['currentVersion'] = this.currentVersion;
    data['webVersion'] = this.webVersion;
    data['webUpgrade'] = this.webUpgrade;
    data['versionFeat'] = this.versionFeat;
    return data;
  }
}
