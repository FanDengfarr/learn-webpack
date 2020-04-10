<template>
	<el-card :body-style="{ padding: 0, backgroundColor: '#fafafa', height: '100vh',position:'absolute',top:'0',left:'0',zIndex:1500,width:'100%' }">
		<page-scaffold-form title="添加流动党员" label-width="100px" @ok="handleSubmit" @cancel="handleCancel">
			<el-form label-width="100px" label-suffix=":" :rules="rules">
				<el-form-item label="党员姓名" prop="name">
					<el-input placeholder="请输入党员姓名" v-model="form.summary" />
				</el-form-item>
				<el-form-item label="党员性别" prop="sex">
					<el-radio v-model="form.sex" label="1">男</el-radio>
					<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
				<el-form-item label="党员属性" prop="property">
					<el-select v-model="form.property" placeholder="请选择党员属性">
						<el-option label="区域一" value="1"></el-option>
						<el-option label="区域二" value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="联系电话" prop="phone">
					<el-input placeholder="请输入手机号码" v-model="form.summary" />
				</el-form-item>
				<el-form-item label="入党日期">
					<el-date-picker v-model="form.date" type="date" placeholder="请选择时间">
					</el-date-picker>
				</el-form-item>
			</el-form>
		</page-scaffold-form>
	</el-card>
</template>

<script>
	export default {
		props: {
			value: {
				type:Object,
				default: {}
			},
		},
		data() {
			return {
				form: {
					summary: "",
					peoples: "",
					sex: '1',
					property: '',
					date: ''
				},
				rules: [{}]
			};
		},
		methods: {
			handleCancel() {
				this.$emit('close')
			},
			handleSubmit(){
				console.log(this.value);
			}
		},
	};
</script>

<style lang="less" scoped>

</style>
