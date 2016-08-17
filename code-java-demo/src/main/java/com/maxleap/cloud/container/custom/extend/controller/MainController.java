package com.maxleap.cloud.container.custom.extend.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * User：David Young
 * Date：16/5/24
 */
@Controller
public class MainController {

  private Logger LOGGER = LoggerFactory.getLogger(MainController.class);

  // 首页
  @RequestMapping(value = "/", method = RequestMethod.GET)
  public String index(String maxleap_appid,String maxleap_userid,String maxleap_sessiontoken,ModelMap modelMap) {
    LOGGER.info("maxleap_appid:"+maxleap_appid + " maxleap_userid:" + maxleap_userid + " maxleap_sessiontoken:"+maxleap_sessiontoken);
    if (maxleap_appid == null || maxleap_userid == null || maxleap_sessiontoken == null) {
      return "error";
    }
    modelMap.addAttribute("appId",maxleap_appid);
    modelMap.addAttribute("userId",maxleap_userid);
    modelMap.addAttribute("sessionToken",maxleap_sessiontoken);
    return "index";
  }

}