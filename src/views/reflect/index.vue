<template>
	<el-card :body-style="{ padding: 0, backgroundColor: '#fafafa', height: '100vh' }">
		<page-scaffold-list @max-height="maxHeight = $event">
			<page-scaffold-header slot="header">
			      <template slot="left">
			       <el-button type="warning" style="background-color: rgba(253, 131, 70, 1);" icon="el-icon-circle-plus-outline" @click="showForm = true">新增</el-button>
			       <el-button  type="danger" style="background-color: rgba(206, 0, 0, 1);" icon="el-icon-delete">删除</el-button>
			      </template>
			      <template slot="right">
			        <!-- <el-form inline> -->
			          <!-- <el-form-item> -->
			            <el-input placeholder="关键字搜索" style="width:300px;">
			            </el-input>
			             <el-button type="danger" style="margin-left: 10px;background-color: rgba(206, 0, 0, 1);" icon="el-icon-search" />
			          <!-- </el-form-item> -->
			        <!-- </el-form> -->
			      </template>
			    </page-scaffold-header>
			<div>
				<el-table :data="list" :max-height="maxHeight">
					<el-table-column type="selection" />
					<el-table-column prop="title" label="姓名" show-overflow-tooltip />
					<el-table-column prop="address" label="性别" show-overflow-tooltip />
					<el-table-column label="党员属性" width="90">
						<template slot-scope="scope">
							{{ ["流动党员", "正式党员", "非党员"][scope.row.meetingStatus] }}
						</template>
					</el-table-column>
					<el-table-column label="联系电话" width="150" prop="reviewStatus">
					</el-table-column>
					<el-table-column prop="createTime" label="入党日期" width="140" />
					<el-table-column label="操作" width="200">
						<el-link type="warning" @click="editItem()">编辑</el-link>
						<el-divider direction="vertical" />
						<el-link type="danger">删除</el-link>
					</el-table-column>
				</el-table>
			</div>
			<div slot="footer">
				<el-pagination background :total="1000" layout="prev,pager,next,sizes,jumper" />
			</div>
		<Form v-if="showForm" @close="showForm=false" :value="editValue"></Form>
		</page-scaffold-list>
	</el-card>
</template>

<script>
	import testStore from '../../../store/test.js'
	import Form from './add.vue'
	export default {
		components:{
			Form
		},
		data() {
			return {
				showForm:false,
				maxHeight: '100%',
				editValue:'',
				list: Array(10).fill({
					title: "省人社厅机关党委、工会慰问困难党员、干部职工",
					address: "男",
					meetingStatus: 0,
					reviewStatus: 13552525252,
					createTime: "2019-09-12 13:00"
				})
			};
		},
		mounted() {
			testStore.dispatch('birthday/getBlessingCards')
		},
		methods: {
			editItem() {
				this.editValue = {'naem':2333}
				this.showForm = true
			}
		},
	};
</script>
