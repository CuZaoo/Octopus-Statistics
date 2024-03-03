<template>
  <main style="margin: 0 10%">
    <el-row :gutter="10" justify="start">
      <el-col :span="6">
<!--        <el-image class="responsive-image" src="src/assets/slide_img1.jpg"/>-->
      </el-col>
      <el-col :span="18">
        <el-table :data="tableData" style="width: 100%" max-height="60vh" :show-header="false">
          <el-table-column label="Column 1">
            <template #default="scope">
              <!-- 自定义内容插槽 -->
              <el-row :gutter="20" justify="space-evenly">
                <el-col :span="12">
                  <!-- 第一个 el-card -->
                  <el-card class="custom-card" :style="{ backgroundImage: `url('${tableData[scope.$index * 2].imageUrl}')` }">
                    <div class="overlay"></div>
                    <span style="font-weight: bold;float: left" class="custom-text">{{ tableData[scope.$index * 2].content }}</span>
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <!-- 第二个 el-card -->
                  <el-card class="custom-card" :style="{ backgroundImage: `url('${tableData[scope.$index * 2 + 1].imageUrl}')` }">
                    <div class="overlay"></div>
                    <span style="font-weight: bold;float: left" class="custom-text">{{ tableData[scope.$index * 2 + 1].content }}</span>
                  </el-card>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

  </main>
</template>
<script lang="ts" setup>
const tableData = [
  { content: 'Content Row 1', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 2', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 3', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  { content: 'Content Row 4', imageUrl: 'src/assets/1bef5c09.jpg' },
  // Add more data as needed
]
</script>


<style scoped>
.custom-card {
  position: relative;
  height: 30vh;
  border-radius: 10px;
  background-size: cover;
  background-position: center;
  color: white;
}

.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* Set an appropriate alpha value */
}

.custom-text {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 20px;
}

.responsive-image {
  height: 80vh; /* 默认设置为100vh */

  /* 使用媒体查询在小屏幕上覆盖默认高度 */
  @media (max-width: 768px) {
    height: auto; /* 使用图像的原始宽高比 */
  }
}
</style>