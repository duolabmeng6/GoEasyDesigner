<template>
  <div class="container">
    <div class="头部"></div>
    <div class="属性框">

      <el-tabs type="border-card" style="height: 100%">
        <el-tab-pane label="属性" style="height: 100%;">
          <div class="container2" style="height: 90%">
            <div class="组件列表">
              <el-select class="m-2" placeholder="组件列表" size="large" style="width: 100%">
                <el-option
                    key="-1"
                    label="窗口"
                    value="-1"
                />
              </el-select>
            </div>
            <div class="属性表格">
              <el-form
                  label-position="left"
                  label-width="50px"
                  style="width: 100%;"
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
            <div class="添加组件事件">

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
        <el-tab-pane label="项目管理">项目管理</el-tab-pane>
      </el-tabs>
    </div>
    <div class="设计区域">
      <el-col :span="24" style="height: 100%">
        <el-tabs type="border-card" tab-position="top" style="height: 100%">
          <el-tab-pane label="界面设计">
            <div class="画布" style="width: 500px;height: 300px;background: #f2f3f5">
            </div>
          </el-tab-pane>
          <el-tab-pane label="编辑代码">
            <el-input
                v-model="textarea"
                :rows="10"
                type="textarea"
                placeholder="Please input"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </div>
    <div class="工具箱">
      <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
        <el-tab-pane label="组件">
          <el-collapse model-value="1" @change="handleChange" accordion style="border: none">
            <el-collapse-item title="系统组件" name="1">
              <el-row>
                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>
                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>
                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
                </el-col>

                <el-col :span="24" style="margin-bottom: 8px">
                  <el-button class="full-width-button" style="width: 100%;">按钮</el-button>
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
    </div>
    <div class="调试信息">
          <el-tabs type="border-card" tab-position="top" style="height: 100%" class="demo-tabs">
            <el-tab-pane label="帮助信息">帮助信息</el-tab-pane>
            <el-tab-pane label="调试信息">调试信息</el-tab-pane>
          </el-tabs>
    </div>
    <div class="标题">
      <el-text size="large" style="">
        <el-icon>
          <Sunny/>
        </el-icon>
        窗口设计器
      </el-text>
    </div>
    <div class="工具条">
      <el-button-group class="ml-4">
        <el-button :icon="Edit">打开</el-button>
        <el-button :icon="Edit">保存</el-button>
        <el-button :icon="Edit">项目信息</el-button>
        <el-button :icon="Edit">运行</el-button>
        <el-button :icon="Edit">编译</el-button>
      </el-button-group>
    </div>
  </div>


</template>


<style>
* {
  margin: 0;
  padding: 0;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 0fr 1fr 1fr 1fr 1fr;
  gap: 6px 6px;
  grid-auto-flow: row;
  height: 100vh;
  overflow: hidden;
}

.头部 {
  grid-area: 1 / 1 / 2 / 6;
}

.属性框 {
  grid-area: 2 / 1 / 5 / 2;
}

.设计区域 {
  grid-area: 2 / 2 / 5 / 5;
}

.工具箱 {
  grid-area: 2 / 5 / 5 / 6;
}

.调试信息 {
  grid-area: 5 / 1 / 6 / 6;
}

.标题 {
  grid-area: 1 / 1 / 2 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

.工具条 {
  grid-area: 1 / 2 / 2 / 6;
  padding: 6px;
}

.属性框 .el-tabs__content{
  height: 100%;
}

.工具箱 .el-tabs__content{
  height: 80%;
  overflow-y: auto;
}

.container2 {  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.1fr 2.6fr 0.3fr;
  gap: 20px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "组件列表"
    "属性表格"
    "添加组件事件";

  justify-content: space-between;
}

.组件列表 { grid-area: 组件列表; }

.属性表格 {
  grid-area: 属性表格;
  overflow-y: auto;
}

.添加组件事件 {
  grid-area: 添加组件事件;
}


</style>
<script setup>
import {Edit} from "@element-plus/icons-vue";
</script>

