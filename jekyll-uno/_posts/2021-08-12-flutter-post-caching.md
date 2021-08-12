---
title:  "Flutter Caching with POST Web Api"
date:   2021-08-12 12:32:00 +0530
categories: [Tech]
tags: [Open-Source, Flutter]
---

If you want to cache web API's in your flutter project, then follow this blog.

### flutter_cache_manager

Caching a normal GET request has been made simple using the package [flutter_cache_manager][flutter_cache_manager].

```dart
var file = await DefaultCacheManager().getSingleFile(url);
```

By simply using the above command, the data in the request will be retrieved from the cache (if present), else will be retrieved from the URL by storing in the cache.

### POST API with flutter_cache_manager

What will happen when there is a POST request which you want to cache in a flutter application?

[flutter_cache_manager][flutter_cache_manager] does not provide option to send a POST request and cache. So, the following steps will help you in caching the POST request in your flutter application.

## Steps to Cache

### Assumptions

For the steps, I will assume that to get data, a POST request is needed which has form data as input and HTML as output.

The solution which I provide can be edited as needed and used for different cases.

```dart
Example base URL: "https://a.com/send-form-data"

Example form data:
var data = new Map<String, dynamic>();
data['name'] = "Name";
data['id'] = "xxx";
```

### URL string

As the base URL to get the data is always the same (`https://a.com/send-form-data`), we can use the form data to create a unique URL that can be used as a key URL for caching the data retrieved.

An example unique URL can be of the following:
```
https://a.com/send-form-data?name="Name"&id="xxx"
```
Here, we are appending the form data similar to the parameters and making it unique. You can use other methods also to make the link unique.

### Packages Needed

- For caching the data, we will be using [flutter_cache_manager][flutter_cache_manager].
- For sending POST requests, we will be using [http][http]

Make sure you add packages in `pubspec.yaml` and import the packages before using them

```dart
import 'package:flutter_cache_manager/flutter_cache_manager.dart';
import 'package:http/http.dart' as http;
```

### Caching POST data

By using the below code, you can easily cache the POST data.
```dart
import 'dart:typed_data'; // import for Unit8List

// [baseUrl] is the base url to get the POST data
// [finalUrl] is the unique url used as key for caching
// [formData] is the form data to be requested
_getData(String baseUrl, String finalUrl, Map<String, dynamic> formData) async {
  // Considering the response as String
  String tempResponse = '';
  // checks if the file exists in cache
  var fileInfo = await DefaultCacheManager().getFileFromCache(finalUrl);
  if (fileInfo == null) {
    // get data from url if not present in cache
    http.Response response;
    try {
      response = await http
          .post(Uri.parse(baseUrl), body: formData);
    } on SocketException catch (_) {
      // TODO: Handle Exception
    }
    tempResponse = response.body;

    // put data into cache after getting from internet
    List<int> list = tempResponse.codeUnits;
    Uint8List fileBytes = Uint8List.fromList(list);
    DefaultCacheManager().putFile(finalUrl, fileBytes);
  } else {
    // get data from file if present in cache
    tempResponse = fileInfo.file.readAsStringSync();
  }
  _parseData(tempResponse);
}
```
Steps Happening:
- By using the [http] package, we send the POST request and get the HTTP response.
- Using the response, we convert the type of response and put the file into cache using [flutter_cache_manager].
- From next time when the method is called with the same unique URL, it retrieves the data from the cache.

We have successfully made the caching happen for POST requests..
Happy Caching!!

[flutter_cache_manager]: https://pub.dev/packages/flutter_cache_manager
[http]: https://pub.dev/packages/http
