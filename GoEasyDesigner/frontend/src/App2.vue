<template>
  <div class="container" style="display: flex; flex-direction: column; height: 100vh;overflow: hidden">
    <el-row align="middle" style="">
      <el-col :span="5" style="height: 50px; display: flex; align-items: center; justify-content: space-evenly;">
        <el-text size="large" style="">
          <el-icon>
            <Sunny/>
          </el-icon>
          窗口设计器
        </el-text>
      </el-col>
      <el-col :span="19" style="padding: 4px">
        <el-button-group class="ml-4">
          <el-button :icon="Edit">打开</el-button>
          <el-button :icon="Edit">保存</el-button>
          <el-button :icon="Edit">项目信息</el-button>
          <el-button :icon="Edit">运行</el-button>
          <el-button :icon="Edit">编译</el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <el-row style="flex: 1;">
      <el-col :span="5" style="padding: 4px" >
        <el-tabs type="border-card" style="height: 100%">
          <el-tab-pane label="属性" style="height: 100%;">
            <div style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
              <div style="background: lightgray; ">
                <el-select class="m-2" placeholder="组件列表" size="large" style="width: 100%">
                  <el-option
                      key="-1"
                      label="窗口"
                      value="-1"
                  />
                </el-select>
              </div>
              <div style="margin: 20px 0px; flex: 1; display: flex;">
                <el-form
                    label-position="left"
                    label-width="50px"
                    style="width: 100%;height: 400px;overflow-y: auto"
                >
                  <el-form-item label="名称">
                    <el-input/>
                  </el-form-item>
                  <el-form-item label="顶边">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="左边">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="宽度">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="高度">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="可视">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="标题">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="名称">
                    <el-input/>
                  </el-form-item>
                  <el-form-item label="顶边">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="左边">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="宽度">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="高度">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="可视">
                    <el-input/>

                  </el-form-item>
                  <el-form-item label="标题">
                    <el-input/>

                  </el-form-item>
                </el-form>
              </div>
              <div style="background: lightgreen;">

                <el-select class="m-2" placeholder="在此处选择加入事件处理函数" size="large" style="width: 100%">
                  <el-option
                      key="-1"
                      label="窗口"
                      value="-1"
                  />

                </el-select>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="支持库">支持库</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="15" style="padding: 4px">
        <el-col :span="24" style="height: 100%">
          <el-tabs type="border-card" tab-position="top" style="height: 100%">
            <el-tab-pane label="界面设计">
              <div class="画布" style="width: 500px;height: 300px;background: #f2f3f5">
              </div>
            </el-tab-pane>
            <el-tab-pane label="编辑代码">

            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-col>
      <el-col :span="4" style="padding: 4px">
        <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
          <el-tab-pane label="组件">
            <el-collapse model-value="1" @change="handleChange" accordion style="border: none">
              <el-collapse-item title="系统组件" name="1">
                <el-row>
                  <el-col :span="24">
                    <el-button class="full-width-button">按钮</el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button class="full-width-button">按钮</el-button>
                  </el-col>
                  <el-col :span="24">
                    <el-button class="full-width-button">按钮</el-button>
                  </el-col>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="数据展示组件" name="2">

              </el-collapse-item>
              <el-collapse-item title="自定义组件" name="3">

              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row style="">
      <el-col :span="24" style="height: 200px;padding-top: 8px">
        <el-tabs type="border-card" tab-position="top" style="height: 200px" class="demo-tabs">
          <el-tab-pane label="帮助信息">帮助信息</el-tab-pane>
          <el-tab-pane label="调试信息">调试信息</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>


<style>
* {
  margin: 0;
  padding: 0;
}
.full-width-button {
  width: calc(100% - 8px); /* 100% width minus 2 * 4px gap */
  margin-right: 4px;
  margin-bottom: 8px;
}
.el-tabs .el-tabs__content {
  height: calc(100% - 50px);
  padding: 4px;
}
</style>
<script setup>
import {Edit} from "@element-plus/icons-vue";
</script>