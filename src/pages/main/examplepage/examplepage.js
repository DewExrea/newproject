import React from 'react';
import styled from 'styled-components';
import { GetData } from '../../../store/dataStore';
import notify from 'devextreme/ui/notify';
import appInfo from '../../../app-info';
import Button from 'devextreme-react/button';
import { LoadPanel } from 'devextreme-react/load-panel';
import { CheckBox } from 'devextreme-react/check-box';
import DataGrid, {
	Pager,
	Paging,
	FilterRow,
	Column,
} from 'devextreme-react/data-grid';
import { bool } from 'prop-types';

const Wrapper = styled.section`
  padding: 10px;
`;

export default class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			path: props.match.path,
			loading: false,
			isOpened: false,
			isActive: false,
			action: '',
		};
		this.onClickAdd = this.onClickAdd.bind(this);
		this.onClickBack = this.onClickBack.bind(this);
		this.onClickSummit = this.onClickSummit.bind(this);
		this.onClickUpdate = this.onClickUpdate.bind(this);
		this.onValueChangedIsActive = this.onValueChangedIsActive.bind(this);
	}

	componentDidMount() {
		// this.setState({ loading: true })
		// let params = {
		// 	"keyword": "",
		// 	"startrow": "",
		// 	"row_return": ""
		// }
		// GetData('API_user/api/v1/userFilter', params).then(result => {
		// 	if (result.response == "200") {
		// 		let resultdata = JSON.parse(result.items)
		// 		this.setState({ getUser: resultdata.data});
		// 	}
		// }).catch(err => {
		// 	notify(`${appInfo.errAlertMsg}`, 'error', 3000);
		// }).finally(fi => {
		// 	this.setState({ loading: false })
		// }
		// );
	}

	onValueChangedIsActive(args) {
		this.setState({
			isActive: args.value
		});
	}

	onClickAdd() {
		this.setState({ isOpened: true, action: 'create' })
	}

	onClickUpdate(e) {
		this.setState({
			isOpened: true, 
			action: 'update',
			username: e.row.data.UserName,
			firstname: e.row.data.FirstName,
			lastname: e.row.data.LastName,
			position: e.row.data.Position,
			phonenumber: e.row.data.PhoneNumber,
			userid: e.row.data.UserId,
			isActive : e.row.data.IsActive,
		})
	}

	onClickBack() {
		this.setState({ isOpened: false, action: '' })
	}

	onClickSummit() {

		let params = {
			"userBy": localStorage.getItem('username'),
			"createBy": localStorage.getItem('username'),
			"userId": (this.state.action == 'create') ? '' : this.state.userid,
			"userName": this.state.username,
			"firstName": this.state.firstname,
			"lastName": this.state.lastname,
			"password": this.state.password,
			"position": this.state.position,
			"phoneNumber": this.state.phonenumber,
			"isActive": (this.state.isActive) ? 1 : 0,
			"roleGroupId": 0,
			"roleUserId": 0,
			"roleGroupName": "",
			"roleUserName": "",
		}

		let url = (this.state.action == 'create') ? 'userCreate' : 'userUpdate';
		GetData('API_user/api/v1/' + url, params).then(result => {
			if (result.response == "200") {

				notify(`${appInfo.successAlertMsg}`, 'success', 3000);
				this.setState({ loading: true })
				let params = {
					"keyword": "",
					"startrow": "",
					"row_return": ""
				}
				GetData('API_user/api/v1/userFilter', params).then(result => {
					if (result.response == "200") {
						let resultdata = JSON.parse(result.items)
						this.setState({ getUser: resultdata.data, loading: false });
					}
				}).catch(err => {
					notify(`${appInfo.errAlertMsg}`, 'error', 3000);
				});
				this.onClickBack();

			} else {
				notify(result.messsage, 'error', 3000);
			}
		}).catch(err => {
			notify(`${appInfo.errAlertMsg}`, 'error', 3000);
		});

	}

	render() {
		var style = {};
		var stylemanual = {};
		style.display = (this.state.isOpened) ? 'none' : '';
		stylemanual.display = (this.state.isOpened) ? '' : 'none';
		return (
			<Wrapper>
				<React.Fragment>
					<LoadPanel visible={this.state.loading} />
					<span style={{ display: "none" }} className='p-name'>{this.state.path}
					</span>
					<div style={style}>
						<div className="col-md-10">

						</div>
						<div className="col-md-2" style={{ paddingTop: '26px' }}>
							<div className="col-md-12" style={{ padding: '0px 2px 0px 2px', top: '-5px' }}>
								<Button
									style={{ backgroundColor: "#ff0000" }}
									type={"default"}
									text={"Add"}
									onClick={this.onClickAdd}
									width={"100%"}
									height={36}
								/>
							</div>
						</div>
						<div style={{ justifyContent: "center", marginTop: "2%", paddingLeft: '15px', paddingRight: '15px' }}>
							<label style={{ paddingleft: '0px' }}> </label>
							<DataGrid
								dataSource={this.state.getUser}
								showBorders={true}
								id='dataGrid'
								width="100%"
								height="410px"
								remoteOperations={true}
								columnMinWidth={50}
								columnAutoWidth={true}
							>

								<Paging defaultPageSize={10} enabled={true} />
								<Pager showPageSizeSelector={true} showInfo={true} allowedPageSizes={[100, 500, 1000]} />
								<FilterRow visible={true} />

								<Column type={'buttons'} width={110} caption={'จัดการ'}
									buttons={[{
										hint: 'edit',
										icon: appInfo.editIcon,
										onClick: this.onClickUpdate
									}]} />

								<Column
									dataField={'UserName'}
									caption={'User Name'}
								/>
								<Column
									dataField={'FirstName'}
									caption={'First Name'}
								/>
								<Column
									dataField={'LastName'}
									caption={'Last Name'}
								/>
								<Column
									dataField={'Position'}
									caption={'Position'}
								/>
								<Column
									dataField={'PhoneNumber'}
									caption={'Phone Number'}
								/>
								<Column
									dataField={'IsActive'}
									caption={'IsActive'}
									type={bool}
								/>
							</DataGrid>
						</div>
					</div>

					<div style={stylemanual}>
						<form className="padd-form">
							<div className="form-horizontal form-bordered">

								<div className="form-group">
									<div className="col-md-6">
										<label>UserName : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="username"
												placeholder="Please Input UserName"
												value={this.state.username || ''}
												onChange={event => this.setState({ username: event.target.value })}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<label>Password : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="password"
												placeholder="Please Input Password"
												value={this.state.password || ''}
												onChange={event => this.setState({ password: event.target.value })}
											/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<div className="col-md-6">
										<label>First Name : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="firstname"
												placeholder="Please Input First Name"
												value={this.state.firstname || ''}
												onChange={event => this.setState({ firstname: event.target.value })}
											/>
										</div>
									</div>
									<div className="col-md-6">
										<label>Last Name : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="lastname"
												placeholder="Please Input Last Name"
												value={this.state.lastname || ''}
												onChange={event => this.setState({ lastname: event.target.value })}
											/>
										</div>
									</div>
								</div>

								<div className="form-group">
									<div className="col-md-6">
										<label>Position : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="position"
												placeholder="Please Input Position"
												value={this.state.position || ''}
												onChange={event => this.setState({ position: event.target.value })}
											/>
										</div>
									</div>
									<div className="col-md-5">
										<label>Phone Number : </label>
										<div className="dx-textbox dx-texteditor dx-editor-outlined dx-texteditor-empty dx-widget">
											<input
												className="dx-texteditor-input text-center"
												type="text"
												id="phonenumber"
												placeholder="Please Input Phone Number"
												value={this.state.phonenumber || ''}
												onChange={event => this.setState({ phonenumber: event.target.value })}
											/>
										</div>
									</div>
									<div className="col-md-1">
										<label>Is Active : </label>
										<div className="" style={{ paddingLeft: '10px', paddingTop: '5px' }}>
											<div className="">
												<div className="">
													<CheckBox
														value={this.state.isActive}
														onValueChanged={this.onValueChangedIsActive}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="">
									<div className="form-group">
										<div className="col-md-8"></div>
										<div className="col-md-2">
											<Button
												disabled={false}
												width={200}
												text="Back"
												onClick={this.onClickBack}
												className="dx-box-item-form-button-Cancel"
											/>
										</div>
										<div className="col-md-2">
											<Button
												disabled={false}
												width={200}
												text="Save"
												onClick={this.onClickSummit}
												className="dx-box-item-form-button-Summit"
											/>
										</div>

									</div>
								</div>
							</div>
						</form>
					</div>
				</React.Fragment>
			</Wrapper>
		);
	}
};