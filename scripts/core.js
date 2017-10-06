'use strict';
// Guid for Product Realization Submissions Librarys
// c4ee623a-c012-430a-bf1a-1eb4ca8f9649


angular.module("PlmApp", [])
	.component("plmTool", { 
		template: `
		<div class="main" ng-controller="PlmCtrl">
			<h1 class="dashheading activeHeader" id="ordertab" ng-click="dashboard = 'Order'; activeHeader();">Order Dashboard</h1>
			<h1 class="dashheading" id="customertab" ng-click="dashboard = 'Customer'; activeHeader();">Customer Dashboard</h1>
			<h1 class="dashheading" id="mytab" ng-click="dashboard = 'My'; activeHeader();">My Tasks</h1>
			<h1 class="dashheading" id="teamtab" ng-click="dashboard = 'Team'; activeHeader(); loadTeams();">Team Tasks</h1>
			<!--<h1 class="dashheading" id="debugtab" ng-click="dashboard = 'Debug'; activeHeader();">Debug</h1>-->
 
			
 
 



			<div ng-show="dashboard == 'Order'" class="dashboardcontainer">
				<div class="selectionarea">
					<div class="sortbox">
						<div class="customerselectcontainer">
							<label class="customerselectlabel">
								Customer Number:
							</label>
							<select class="customerselect" ng-model="customerselected" ng-options="customer for customer in customers">

							</select>
						</div>
						
						<div class="orderselectcontainer">
							<label class="orderselectlabel">
							PO Number:
							</label>
							<select class="orderselect" ng-model="orderselected" ng-options="order as order.ConcatPO for order in orders | filter: {Customer_x0020_Number: customerselected}: true">
												
							</select>
						</div>
						<button class="orderselectbutton" ng-disabled="orderselected == null" type="button" ng-click="loadOrder(customerselected, orderselected, null, false); showrefresh = true;">Show Order</button>
					</div>

					<div class="searchbox">
						<label class="ordersearchlabel">
							Search By Order No.
						</label>
						<input class="ordersearch" ng-model="searchValue" placeholder="OrderNumber"></input>
						<button class="ordersearchbutton" ng-disabled="searchValue == null" type="button" ng-click="loadOrder(null, null, searchValue, true); showrefresh = true;">Search</button>
					</div>
				</div>
				<div id="loader" ng-show="showdash == false">
				</div>
				<div class="dashboardarea" ng-show="showdash== true">
					<span class="orderheading" ng-if="orderDisplayed">

						<h2 class="aligntop"> Customer Name: {{orderCustomerNumber}} </h2>
						</br>
						<h2 class="aligntop"> Order Number: </h2> <a ng-href="https://oberg.sharepoint.com/plm/_layouts/15/FormServer.aspx?XmlLocation=/plm/Product%20Realization%20Submission%20Library/{{selectedOrder.Title}}" target="_blank"><h3 class="aligntop">{{CustomerNumber}}-{{OrderNumber}} </h3></a><div class="aligntop" id="refreshorder" ng-show="showrefresh == true" ng-click="loadOrder(customerselected, orderselected, null, false)"></div></h3></br>
						<h2> Stage Select: </h2> <select class="stageselect" name="showfilter" ng-model="stageFilter" ng-options="stage as stage for stage in stages"> 
						

					</span>
										</select>
					<div class="ordercontainer">
						<div class="taskouter" ng-repeat="task in availableTasks | filter : {Stage: stageFilter}: true">
							<div class="taskcontainer {{task.cssClass}}" ng-click="openurl('https://oberg.sharepoint.com/plm/Lists/OrderTasks/EditForm.aspx?ID=', this.task.orderDetails.ID)">
								<h3 class="stageheading">{{task.Stage}}</h3>
								<h3>{{task.Checklist_x0020_ID}}</h3>
								<h3>{{task.Title}}</h3>

							
									<h4 ng-show="task.orderDetails.DueDate != null">Due: {{task.orderDetails.DueDate | date:'MM/dd/yyyy'}}</h4>
									<h4 ng-show="task.DaysLate != null">Days Late: {{task.DaysLate}}</h4>
									<h4 ng-show="task.orderDetails.Modified != null && task.orderDetails.PercentComplete == 1">Completed: {{task.orderDetails.Modified | date:'MM/dd/yyyy'}} </h4>
									<h4 ng-show="task.orderDetails.AssignedName != null">Assigned To: {{task.orderDetails.AssignedName}}</h4>

							</div>
							<div id="chevron"></div>
						</div>
						
					</div>
				</div>
			</div>









			<div ng-show="dashboard == 'Customer'" class="dashboardcontainer">
				<div class="selectionarea">
					<div class="sortbox">
						<div class="customerselectcontainer">
							<label class="customerselectlabel">
								Customer Number:
							</label>
							<select class="customerselect" ng-model="custcustomerselected" ng-options="customer for customer in customers">

							</select>
						</div>
						<button class="orderselectbutton" ng-disabled="custcustomerselected == null" type="button" ng-click="loadCustomer(custcustomerselected); custcustomerselecteds = custcustomerselected;">Show Customer</button>
					</div>
				</div>
				<h2 ng-show="custcustomerselecteds !=null">Customer Number  {{custcustomerselecteds}}</h2>
				<h2 ng-show="custcustomerselecteds !=null">Customer Name  {{customerName}}</h2>

				<h3 ng-show="custcustomerselecteds !=null">Active Projects: {{projectscount}}</h3>
				<h3 ng-show="custcustomerselecteds !=null">Projects with Late Tasks: {{lateprojects}} </h3>
				<div id="loader" ng-show="showdash == false">
				</div>
				<table style="width:100%" ng-show="showdash == true">
					<tr>
						<th id="ordercolumnhead"><div id="refresh" ng-if="custcustomerselecteds != null" ng-click="loadCustomer(custcustomerselecteds)"></div><h3>Order ID</h3></th>
						<th ng-repeat="stage in stages">{{stage}}</th>
					</tr>
					<tr ng-repeat="custorder in customerOrders">
						<td class="stagedate">
							<a ng-href="https://oberg.sharepoint.com/plm/_layouts/15/FormServer.aspx?XmlLocation=/plm/Product%20Realization%20Submission%20Library/{{custorder.Title}}" target="_blank"><h4>{{custorder.Customer_x0020_Number}}-{{custorder.ConcatPO}}</h4></a>
							<h4 class="openorder" ng-click="openOrderFromCustomer(custorder.Customer_x0020_Number, custorder.ConcatPO)">Open Order</h4>

						</td>
						<td class="stagedate"  id="{{custorder.RPOStatus}}">
							<span  ng-if="custorder.RPO_x0020_Completed != null">{{custorder.RPO_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.RPOStatus}}</span>
							<span  ng-if="custorder.RPO_x0020_Completed == null"> <span ng-if="custorder.RPODue != null">Due:</span> {{custorder.RPODue | date:'MM/dd/yyyy'}} {{custorder.RPOStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.OEStatus}}">
							<span  ng-if="custorder.OE_x0020_Completed != null">{{custorder.OE_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.OEStatus}}</span>
							<span  ng-if="custorder.OE_x0020_Completed == null"><span ng-if="custorder.OEDue != null">Due:</span>{{custorder.OEDue | date:'MM/dd/yyyy'}} {{custorder.OEStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.EPCStatus}}">
							<span  ng-if="custorder.EPC_x0020_Completed != null">{{custorder.EPC_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.EPCStatus}}</span>
							<span  ng-if="custorder.EPC_x0020_Completed == null"><span ng-if="custorder.EPCDue != null">Due:</span>{{custorder.EPCDue | date:'MM/dd/yyyy'}} {{custorder.EPCStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.ENGStatus}}">
							<span  ng-if="custorder.ENG_x0020_Completed != null">{{custorder.ENG_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.ENGStatus}}</span>
							<span  ng-if="custorder.ENG_x0020_Completed == null"><span ng-if="custorder.ENGDue != null">Due:</span>{{custorder.ENGDue | date:'MM/dd/yyyy'}} {{custorder.ENGStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.DPCStatus}}">
							<span  ng-if="custorder.DPC_x0020_Completed != null">{{custorder.DPC_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.DPCStatus}}</span>
							<span  ng-if="custorder.DPC_x0020_Completed == null"><span ng-if="custorder.DPCDue != null">Due:</span>{{custorder.DPCDue | date:'MM/dd/yyyy'}} {{custorder.DPCStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.ACKStatus}}">
							<span  ng-if="custorder.ACK_x0020_Completed != null">{{custorder.ACK_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.ACKStatus}}</span>
							<span  ng-if="custorder.ACK_x0020_Completed == null"><span ng-if="custorder.ACKDue != null">Due:</span>{{custorder.ACKDue | date:'MM/dd/yyyy'}} {{custorder.ACKStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.RTPStatus}}">
							<span  ng-if="custorder.RTP_x0020_Completed != null">{{custorder.RTP_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.RTPStatus}}</span>
							<span  ng-if="custorder.RTP_x0020_Completed == null"><span ng-if="custorder.RTPDue != null">Due:</span>{{custorder.RTPDue | date:'MM/dd/yyyy'}} {{custorder.RTPStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.QEQStatus}}">
							<span  ng-if="custorder.QEQ_x0020_Completed != null">{{custorder.QEQ_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.QEQStatus}}</span>
							<span  ng-if="custorder.QEQ_x0020_Completed == null"><span ng-if="custorder.QEQDue != null">Due:</span>{{custorder.QEQDue | date:'MM/dd/yyyy'}} {{custorder.QEQStatus}}</span>
						</td>
						<td class="stagedate" id="{{custorder.MEEStatus}}">
							<span  ng-if="custorder.MEE_x0020_Completed != null">{{custorder.MEE_x0020_Completed | date:'MM/dd/yyyy'}} {{custorder.MEEStatus}}</span>
							<span  ng-if="custorder.MEE_x0020_Completed == null"><span ng-if="custorder.MEEDue != null">Due:</span>{{custorder.MEEDue | date:'MM/dd/yyyy'}} {{custorder.MEEStatus}}</span>
						</td>

																				
				</table>
			</div>






			<div ng-if="dashboard == 'My'" class="dashboardcontainer">
				<h3>You currently have {{userTasksCount}} tasks.</h3>
				<div class="dashboardarea" ng-repeat="order in myOrders">
					<span class="orderheading">
						<h2 class="aligntop"> Order Number: {{order}}</h2> 
					</span>
					<div class="ordercontainer">
						<div class="taskouter" id="halftask" ng-repeat="task in userTasks | filter: order">
							<div class="mytaskcontainer {{task.cssClass}}" ng-click="openurl('https://oberg.sharepoint.com/plm/Lists/OrderTasks/EditForm.aspx?ID=', this.task.ID)">
								<h3>{{task.TrimTitle}}</h3>

							
									<h4 ng-show="task.DueDate != null">Due: {{task.DueDate | date:'MM/dd/yyyy'}}</h4>
									<h4 ng-show="task.DaysLate != null">Days Late: {{task.DaysLate}}</h4>
									<h4 ng-show="task.Modified != null && task.PercentComplete == 1">Completed: {{task.Modified | date:'MM/dd/yyyy'}} </h4>
							</div>
							
						</div>
					</div>
				</div>
			</div>


			<div ng-show="dashboard == 'Team'" class="dashboardcontainer">
				<div id="teamtabdiv">
					<h2 id="pmptab" class="dashheading" ng-click="team = 'PMP'; teamactiveHeader();">PMP</h2>
					<h2 id="toolingtab" class="dashheading" ng-click="team = 'Tooling'; teamactiveHeader();">Tooling</h2>
				</div>



				<div ng-show="team == 'PMP'">
					<label id="teamlabel">Team:</label>

					<select class="teamSelect" ng-model="teamselected" ng-change="filterTeams(teamselected)" ng-options="Team.Name for Team in Teams track by Team.ID">
							<option value="">-- choose a team --</option>
					</select>
					
					</br>
					
					</br>

					<div id="teamContainer">


					<h3>Team Members:<h3>
						<div class="resourceCard" id="{{Member.Id}}" ng-repeat="Member in filteredMembers" >
							<label>{{Member.Name}}</label> </br>
							<label>{{Member.Email}}</label> </br>
							<label>{{Member.Type}}</label> </br>
							<label>{{Member.TeamName}}</label> </br>
							<label>Active Tasks: {{Member.TotalTasks}}</label>
							<div class="memberbutton" ng-click="filterToMember(Member.Id)"><span>Show</span></div>

						</div>
					</div>

					<div id="teamTasksContainer">
						<h3>Tasks:</h3>
						<h3 ng-show="filteredMember.TotalTasks == 0"> This team member does not have any tasks. Please select another.</h3>
							<div class="filteredOrder" ng-repeat="order in filteredMember.myOrders">
								<span class="filteredOrderHeading">
									<h2 class="aligntop"> Order Number: {{order}}</h2> 
								</span>
								<div class="filteredOrderTasks">
									<div  class="mytaskcontainer {{task.cssClass}}" id="halftask" ng-repeat="task in filteredMember.Tasks | filter: order" ng-click="openurl('https://oberg.sharepoint.com/plm/Lists/OrderTasks/EditForm.aspx?ID=', task.ID)">
										<h3 class="stageheading">{{task.Stage}}</h3>
										<h3>{{task.TrimTitle}}</h3>
									 	<h4 ng-show="task.DueDate != null">Due: {{task.DueDate | date:'MM/dd/yyyy'}}</h4>
										<h4 ng-show="task.DaysLate != null">Days Late: {{task.DaysLate}}</h4>
										<h4 ng-show="task.orderDetails.Modified != null && task.orderDetails.PercentComplete == 1">Completed: {{task.orderDetails.Modified | date:'MM/dd/yyyy'}} </h4>
										<h4 ng-show="task.orderDetails.AssignedName != null">Assigned To: {{task.orderDetails.AssignedName}}</h4>
									</div>
								</div>	
							</div>
					
					</div>
					<div ng-show="team == 'Tooling'">
						Hello
					</div>


				</div>

	
			</div>

			<div ng-show="dashboard == 'Debug'" class="dashboardcontainer">
				<h3>Processes</h3>
				<pre>{{Processes | json}}</pre>

				<h3>OrderTypes</h3>
				<pre>{{OrderTypes | json}}</pre>

				<h3>Teams</h3>
				<pre>{{Teams | json}}</pre>

				<h3>PLM Members</h3>
				<pre>{{Members | json}}</pre>			
	
			</div> 

		</div>
		`
	})
	.controller('PlmCtrl', function($scope, $http){
		
		$scope.dashboard = "Order";


//---------------------------------------------------------------- Get Clean PLM Data From Lists ----------------------------------------------------------------//



	

		//Get Processes from PLM Processes List
			var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('PLM Processess')/items?";
	        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
			$http(request).then(results => {
				//Creating Clean Array of Processes
				$scope.Processes = [];
				for (var i=0; i<results.data.d.results.length; i++) {		
					// Initializing Object
					$scope.process = {};
					//Setting Member Object Properties
					$scope.process.Name = results.data.d.results[i].Title;
					$scope.process.Id = results.data.d.results[i].Process_x0020_ID;
					// Pushing to Clean Processes Array
					$scope.Processes.push($scope.process);
					// Clearing Process object
					$scope.process = {};
				}
			});

		//Get Order Types from PLM Order Type List
			var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('PLM Order Types')/items?";
	        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
			$http(request).then(results => {				
				//Creating Clean Array of Processes
				$scope.OrderTypes = [];
				for (var i=0; i<results.data.d.results.length; i++) {					
					// Initializing Object
					$scope.ordertype = {};
					//Setting Member Object Properties
					$scope.ordertype.Name = results.data.d.results[i].Title;
					$scope.ordertype.Id = results.data.d.results[i].Type_x0020_ID;
					// Pushing to Clean Processes Array
					$scope.OrderTypes.push($scope.ordertype);
					// Clearing Process object
					$scope.ordertype = {};
				}
			});			
		




//---------------------------------------------------------------- End Get Clean PLM Data From Lists ----------------------------------------------------------------//
		$scope.filterToMember = function(memberselected){
			$(".resourceCard").removeClass("selectedMember");
			$("#" + memberselected).addClass("selectedMember");
			for (var i = 0; i < $scope.filteredMembers.length; i++) {
				if ($scope.filteredMembers[i].Id == memberselected) {
					$scope.filteredMember = $scope.filteredMembers[i];


					// Function to filter dups
					function inArray(needle,haystack)
						{
						    var count=haystack.length;
						    for(var i=0;i<count;i++)
						    {
						        if(haystack[i]===needle){return true;}
						    }
						    return false;
					}


					//Process Tasks Status----------------------
					var today = String.format("{0:s}",new Date());
					var today = today + 1;					
					for (var x = 0; x < $scope.filteredMember.Tasks.length; x++) {
						// Task Detail Parse
						var splitTitle = $scope.filteredMember.Tasks[x].Title.split("-");
						$scope.filteredMember.Tasks[x].TaskCustomer = splitTitle[0];
						$scope.filteredMember.Tasks[x].TaskOrder = splitTitle[1];
						$scope.filteredMember.Tasks[x].TaskConcatOrder = $scope.filteredMember.Tasks[x].TaskCustomer + "-"+ $scope.filteredMember.Tasks[x].TaskOrder;
						$scope.filteredMember.Tasks[x].TrimTitle = splitTitle[2];


						// Does task have a due date to be considered late?
						if ($scope.filteredMember.Tasks[x].DueDate == null) {
							//No due date so simply check if completed or not for class distinction
							if ($scope.filteredMember.Tasks[x].Status == "Completed"){
								$scope.filteredMember.Tasks[x].cssClass = "completed";
							} else {
								$scope.filteredMember.Tasks[x].cssClass = "inprogress";
							}
						} else {
							if ($scope.filteredMember.Tasks[x].Status == "Completed") {
								//We want to add 1 to due date to adjust for completion on day of
								if ($scope.filteredMember.Tasks[x].Modified < ($scope.availableTasks[x].DueDate + 1)) {
									$scope.filteredMember.Tasks[x].cssClass = "completed";
								} else {
									$scope.filteredMember.Tasks[x].cssClass = "completedlate"
								}	
							} else {
								var today = String.format("{0:s}",new Date());
								var today = today + 1;
								//We want to add 1 to due date to adjust for completion on day of
								if (($scope.filteredMember.Tasks[x].DueDate) > today){
									$scope.filteredMember.Tasks[x].cssClass = "inprogress";
								} else {
									$scope.filteredMember.Tasks[x].cssClass = "late";
									var d1 = new Date(); //"now"
									var d2 = new Date($scope.filteredMember.Tasks[x].DueDate)  // some date
									var ms = Math.abs(d1-d2);  // difference in milliseconds
									var d, h, m, s;
  										s = Math.floor(ms / 1000);
									  m = Math.floor(s / 60);
									  s = s % 60;
									  h = Math.floor(m / 60);
									  m = m % 60;
									  d = Math.floor(h / 24);
									$scope.filteredMember.Tasks[x].DaysLate = d;

								}
							}
						}

					}
					// Getting a list of all orders existing in the assigned tasks
					$scope.filteredMember.myOrders = [];
					for(var x=0; x<$scope.filteredMember.Tasks.length; x++) {
						if (!inArray($scope.filteredMember.Tasks[x].TaskConcatOrder, $scope.filteredMember.myOrders)) {
							$scope.filteredMember.myOrders.push($scope.filteredMember.Tasks[x].TaskConcatOrder);
						}
					}

				}
			}
		}
		$scope.loadTeams = function () {
				//Get Teams from PLM Teams List
				var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('PLM Teams')/items?";
	        	var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
			$http(request).then(results => {
				//Creating Clean Array of Teams
				$scope.Teams = [];
				for (var i=0; i<results.data.d.results.length; i++) {
					$scope.team = {};
					//Get Data in. 
					$scope.team.Name = results.data.d.results[i].Title;
					$scope.team.Acronym = results.data.d.results[i].Team_x0020_Acronym;
					$scope.team.ID = results.data.d.results[i].Team_x0020_ID;
					//Push To Array
					$scope.Teams.push($scope.team);
					//Clearning Team Variable
					$scope.team = {};
				}
				//Get Members from PLM Members List
				var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('PLM Members')/items?";
		        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
				$http(request).then(results => {				
					//Creating Clean Array of Teams
					$scope.Members = [];
					for (var i=0; i<results.data.d.results.length; i++) {					
						// Initializing Object
						$scope.member = {};
						// Setting Member Object Properties
						$scope.member.Name = results.data.d.results[i].Title;
						$scope.member.Email = results.data.d.results[i].Column2;
						$scope.member.Type = results.data.d.results[i].Column3;
						$scope.member.TeamId = results.data.d.results[i].Column4;
						$scope.member.Id = results.data.d.results[i].Resource_x0020_IdentityStringId;
						// Pushing to Clean Members Array
						$scope.Members.push($scope.member);
						// Clearing Member Variable
						$scope.member = {};

					}
					//Getting Team Name on Every Member
					for (var i=0; i<$scope.Members.length; i++){
						for (var x = 0; x < $scope.Teams.length; x++) {
							if ($scope.Members[i].TeamId == $scope.Teams[x].ID) {
								$scope.Members[i].TeamName = $scope.Teams[x].Name;
								$scope.Members[i].TeamAcronym = $scope.Teams[x].Acronym;

							}
						}
					}

	
				});
			});


		}

		$scope.filterTeams = function(teamselected) {
			$scope.filteredMembers = [];
			$scope.filteredMembersIDs = [];
			$scope.filteredMember = {};
			for (var i= 0; i<$scope.Members.length; i++) {
				if ($scope.Members[i].TeamId == teamselected.ID) {
					$scope.filteredMembers.push($scope.Members[i]);
					$scope.filteredMembersIDs.push(parseInt($scope.Members[i].Id));
				}



			}
			buildURL();

			 function buildURL() {
				var urlBase = "/plm/_api/web/lists/getbytitle('Order Tasks')/items?$filter=(";
				var urlEnd = ")and (PercentComplete lt '1')";
				var urlIDs = "";

				for (var i = 0; i < $scope.filteredMembersIDs.length; i++) {
					if (i == 0) {
						urlIDs = urlIDs + "AssignedToId eq'" + $scope.filteredMembersIDs[i] + "'";
					} else {
						urlIDs = urlIDs + " or AssignedToId eq'" + $scope.filteredMembersIDs[i] + "'";
					}
					
				}
				var fullUrl = urlBase + urlIDs + urlEnd;

				var url = _spPageContextInfo.siteAbsoluteUrl + fullUrl;
				var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
				$http(request).then(results => {

					$scope.TeamTasks = results.data.d.results;
					for (var i = 0; i < $scope.filteredMembers.length; i++) {
						$scope.filteredMembers[i].Tasks = [];
						$scope.filteredMembers[i].TotalTasks = 0;
						var today = String.format("{0:s}",new Date());
						var today = today + 1;
						for (var x = 0; x < $scope.TeamTasks.length; x++) 

							if ($scope.filteredMembers[i].Id == $scope.TeamTasks[x].AssignedToId.results[0]) {
								$scope.filteredMembers[i].Tasks.push($scope.TeamTasks[x]);
								$scope.filteredMembers[i].TotalTasks = $scope.filteredMembers[i].TotalTasks + 1;
							}
						}
					
				});
			}

		}




		//Get Users (We are using this so we can display usernames on assignment tiles)
		var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/siteusers?$select=Id,Title";
  		var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
		$http(request).then(results => {
			$scope.users = results.data.d.results;
		});	

		//Get UserTasks (This is used on the my tasks dashboard to get tasks assigned to the current user)
		var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Order Tasks')/items?$filter=(AssignedToId eq'" + _spPageContextInfo.userId + "') and (PercentComplete lt '1')";
  		var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
		$http(request).then(results => {
			
			// setting to object
			$scope.userTasks = results.data.d.results;

			$scope.userTasksCount = $scope.userTasks.length;
			
			// Function to filter dups
			function inArray(needle,haystack)
				{
				    var count=haystack.length;
				    for(var i=0;i<count;i++)
				    {
				        if(haystack[i]===needle){return true;}
				    }
				    return false;
			}

			// Parse Out Task Titles for Customer, Order, and Clean Title
			for (var i = 0; i < $scope.userTasks.length; i++) {
				
				var splitTitle = $scope.userTasks[i].Title.split("-");

				$scope.userTasks[i].TaskCustomer = splitTitle[0];
				$scope.userTasks[i].TaskOrder = splitTitle[1];
				$scope.userTasks[i].TaskConcatOrder = $scope.userTasks[i].TaskCustomer + "-"+ $scope.userTasks[i].TaskOrder;
				$scope.userTasks[i].TrimTitle = splitTitle[2];
				


				

				// Determining Task Status
				var today = String.format("{0:s}",new Date());
				if ($scope.userTasks[i].DueDate < today) {
					$scope.userTasks[i].cssClass = "late";
						var d1 = new Date(); //"now"
						var d2 = new Date($scope.userTasks[i].DueDate)  // some date
						var ms = Math.abs(d1-d2);  // difference in milliseconds
						var d, h, m, s;
								s = Math.floor(ms / 1000);
						  m = Math.floor(s / 60);
						  s = s % 60;
						  h = Math.floor(m / 60);
						  m = m % 60;
						  d = Math.floor(h / 24);
						$scope.userTasks[i].DaysLate = d;						
				} else {
					$scope.userTasks[i].cssClass = "inprogress";
				}
			}

			// Getting a list of all orders existing in the assigned tasks
			$scope.myOrders = [];
			for(var x=0; x<$scope.userTasks.length; x++) {
				if (!inArray($scope.userTasks[x].TaskConcatOrder, $scope.myOrders)) {
					$scope.myOrders.push($scope.userTasks[x].TaskConcatOrder);
				}
			}




		});	


		//Get Stages From Old Bucket List
		var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Process Task List')/items?$select=Stage&$top=500";
  		var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
		$http(request).then(results => {
			function inArray(needle,haystack)
				{
				    var count=haystack.length;
				    for(var i=0;i<count;i++)
				    {
				        if(haystack[i]===needle){return true;}
				    }
				    return false;
				}

			$scope.stages = [];

			for(var i=0;i<results.data.d.results.length;i++) {
				if (!inArray(results.data.d.results[i].Stage, $scope.stages)) {
					$scope.stages.push(results.data.d.results[i].Stage);
				}
			}
		});





		//Get Companies from Submissions
		var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Submission Library')/items?$select=Customer_x0020_Number&$top=500&$orderby=Customer_x0020_Number asc&$filter=OrderStatus ne 'Completed'";
        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
		$http(request).then(results => {
			function inArray(needle,haystack)
				{
				    var count=haystack.length;
				    for(var i=0;i<count;i++)
				    {
				        if(haystack[i]===needle){return true;}
				    }
				    return false;
				}

			$scope.customers = [];

			for(var i=0;i<results.data.d.results.length;i++) {
				if (!inArray(results.data.d.results[i].Customer_x0020_Number, $scope.customers)) {
					$scope.customers.push(results.data.d.results[i].Customer_x0020_Number);
				}
			}
		});


		//Get Order Numbers from Submission Library
		var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Submission Library')/items?$select=ConcatPO,Customer_x0020_Number&$top=500&$orderby=ConcatPO asc&$filter=OrderStatus ne 'Completed'";
        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
		$http(request).then(results => {
			function inArray(needle,haystack)
				{
				    var count=haystack.length;
				    for(var i=0;i<count;i++)
				    {
				        if(haystack[i]===needle){return true;}
				    }
				    return false;
				}

			$scope.orders = [];

			for(var i=0;i<results.data.d.results.length;i++) {
				if (!inArray(results.data.d.results[i].ConcatPO, $scope.orders)) {
					$scope.orders.push({ConcatPO: results.data.d.results[i].ConcatPO, Customer_x0020_Number: results.data.d.results[i].Customer_x0020_Number});
				}
			}
		});


		// Load order and tasks
		$scope.loadOrder = function (selectedcustomer, selectedorder, searchString, isSearch) {
			
			$scope.showdash = false; 

			//Determine if search or selection
			if (isSearch) {
				var searchParams = searchString.split("-");
				var orderParam = searchParams[1];
				var customerParam = searchParams[0];

			} else {
				var orderParam = selectedorder.ConcatPO;
				var customerParam = selectedcustomer;
			};
			

				//Get Order Information from Submission Library
				var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Submission Library')/items?$filter=ConcatPO eq'" + orderParam + "' and Customer_x0020_Number eq'" + customerParam + "'&$top=500";
		        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
				$http(request).then(results => {

					$scope.selectedOrder = results.data.d.results[0];
					// Parsing out the file extnesion here for .xml
					var orderHeader = $scope.selectedOrder.Title.split(".");

					//Getting the Customer and Order Number From the file name.
					orderHeader = orderHeader[0].split("-");
					$scope.CustomerNumber = orderHeader[0];
					$scope.OrderNumber = orderHeader[1];
					$scope.orderCustomerNumber = $scope.selectedOrder.Customer_x0020_Name;

				}).catch(function(e){
							 window.alert("That order does not exist. Please try again.");
				}).then(function(){
					// Get Tasks Available
					var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Process Task List')/items?$filter=Process eq'" + $scope.selectedOrder.Process + "' and Order_x0020_Type eq'" + $scope.selectedOrder.Type + "'&$top=500";
		        	var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
					$http(request).then(results => {
						$scope.availableTasks = results.data.d.results;
						$scope.orderDisplayed = true;
						var activeTasksUrl = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Order%20Tasks')/items?$filter=startswith(Title, '" + $scope.selectedOrder.Customer_x0020_Number + "-" + $scope.selectedOrder.PONumber + "')";
				    	var activeTasksRequest = { method: "GET", url: activeTasksUrl, headers: {  "accept": "application/json;odata=verbose" } };
						$http(activeTasksRequest).then(results => {
							$scope.orderTasks = results.data.d.results;
							for (var i = 0; i < $scope.orderTasks.length; i++) {
								var parsedTitle = $scope.orderTasks[i].Title.split("-");
								$scope.orderTasks[i].Title = parsedTitle[2]; 
							}

							//Loop throuugh available tasks for the given process
							for (var i = 0; i < $scope.availableTasks.length; i++) {



								//If task has been assigned assign details of the instance to the available and displayed task
								function isAssigned(orderTask) {
								  return orderTask.Title == $scope.availableTasks[i].Title;
								}

								//Finding if order tasks has been assigned
								$scope.availableTasks[i].orderDetails = $scope.orderTasks.find(isAssigned);

								//LOGIC TO DETERMINE STATUS OF TASK
								// 
								// 
								// 
								//First we want to check if task is assigned if no order details then hasn't so set class to not assigned 
								if ($scope.availableTasks[i].orderDetails == null) 
								{
									$scope.availableTasks[i].cssClass = "notassigned";


								} else 
								// So now all tasks below here have been assigned. 
								{
									for (var n = 0; n < $scope.users.length; n++) {
										if ($scope.availableTasks[i].orderDetails.AssignedToId.results[0] == $scope.users[n].Id) {
											$scope.availableTasks[i].orderDetails.AssignedName = $scope.users[n].Title;	
										}
									
									}
									// Does task have a due date to be considered late?
									if ($scope.availableTasks[i].orderDetails.DueDate == null) {
										//No due date so simply check if completed or not for class distinction
										if ($scope.availableTasks[i].orderDetails.Status == "Completed") 
										{
											$scope.availableTasks[i].cssClass = "completed";
										} else 
										{
											$scope.availableTasks[i].cssClass = "inprogress";
										}

									} else 
									//Task has a due date so first check if it's completed
									{
										if ($scope.availableTasks[i].orderDetails.Status == "Completed") 
										// Is completed so was it late or ontime?
										{
											//We want to add 1 to due date to adjust for completion on day of
											if ($scope.availableTasks[i].orderDetails.Modified < ($scope.availableTasks[i].orderDetails.DueDate + 1))
											//Ontime so Completed 
											{
												$scope.availableTasks[i].cssClass = "completed";
											} 
											else
											// Late so compelted late
											{
												$scope.availableTasks[i].cssClass = "completedlate"
											}
											
										} else 
										
										// Is not completed so is it late or just in progress?
										{
											var today = String.format("{0:s}",new Date());
											var today = today + 1;
											//We want to add 1 to due date to adjust for completion on day of
											if (($scope.availableTasks[i].orderDetails.DueDate) > today) 
											// not passed due date so just in progress
											{
												$scope.availableTasks[i].cssClass = "inprogress"
											} else 
											//passed the due date so late
											{
												$scope.availableTasks[i].cssClass = "late"
													var d1 = new Date(); //"now"
													var d2 = new Date($scope.availableTasks[i].orderDetails.DueDate)  // some date
													var ms = Math.abs(d1-d2);  // difference in milliseconds
													var d, h, m, s;
				  										s = Math.floor(ms / 1000);
													  m = Math.floor(s / 60);
													  s = s % 60;
													  h = Math.floor(m / 60);
													  m = m % 60;
													  d = Math.floor(h / 24);
													$scope.availableTasks[i].DaysLate = d;												
											}
										}

									}
								}

								// END LOGIC TREE FOR STATUS OF TASKS
								$scope.showdash = true;
							}
						}).catch(function(e){
							window.alert(e);
						});
					});
				});
			
		}
		$scope.loadCustomer = function(customerParam) {
			$scope.showdash = false; 
			var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Submission Library')/items?$filter=Customer_x0020_Number eq'" + customerParam + "' and OrderStatus ne 'Completed'&$top=500";
	        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
			$http(request).then(results => {

				$scope.customerOrders = results.data.d.results;
				$scope.lateprojects = 0;
				$scope.customerName = $scope.customerOrders[0].Customer_x0020_Name;

				for (var i = 0; i < $scope.customerOrders.length; i++) {

					var lateflag = false;

					// 
					// Logic 
					if($scope.customerOrders[i].RPOStatus == null) {
						$scope.customerOrders[i].RPOStatus = "N/A";
					}
					if($scope.customerOrders[i].OEStatus == null) {
						$scope.customerOrders[i].OEStatus = "N/A";
					}
					if($scope.customerOrders[i].EPCStatus == null) {
						$scope.customerOrders[i].EPCStatus = "N/A";
					}
					if($scope.customerOrders[i].ENGStatus == null) {
						$scope.customerOrders[i].ENGStatus = "N/A";
					}					
					if($scope.customerOrders[i].DPCStatus == null) {
						$scope.customerOrders[i].DPCStatus = "N/A";
					}
					if($scope.customerOrders[i].ACKStatus == null) {
						$scope.customerOrders[i].ACKStatus = "N/A";
					}
					if($scope.customerOrders[i].RTPStatus == null) {
						$scope.customerOrders[i].RTPStatus = "N/A";
					}
					if($scope.customerOrders[i].QEQStatus == null) {
						$scope.customerOrders[i].QEQStatus = "N/A";
					}
					if($scope.customerOrders[i].MEEStatus == null) {
						$scope.customerOrders[i].MEEStatus = "N/A";
					}


					// 
					// Logic to get if task is late
					// 
					var today = String.format("{0:s}",new Date());

					if(($scope.customerOrders[i].RPOStatus == "InProgress" && $scope.customerOrders[i].RPODue < today)&& $scope.customerOrders[i].RPODue != null )  {
						$scope.customerOrders[i].RPOStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].OEStatus == "InProgress" && $scope.customerOrders[i].OEDue < today)&& $scope.customerOrders[i].OEDue != null)  {
						$scope.customerOrders[i].OEStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].EPCStatus == "InProgress" && $scope.customerOrders[i].EPCDue < today)&& $scope.customerOrders[i].EPCDue != null)  {
						$scope.customerOrders[i].EPCStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].ENGStatus == "InProgress" && $scope.customerOrders[i].ENGDue < today)&& $scope.customerOrders[i].ENGDue != null)  {
						$scope.customerOrders[i].ENGStatus = "Late";
						lateflag = true;
					}					
					if(($scope.customerOrders[i].DPCStatus == "InProgress" && $scope.customerOrders[i].DPCDue < today)&& $scope.customerOrders[i].DPCDue != null)  {
						$scope.customerOrders[i].DPCStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].ACKStatus == "InProgress" && $scope.customerOrders[i].DPCDue < today)&& $scope.customerOrders[i].ACKDue != null)  {
						$scope.customerOrders[i].ACKStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].RTPStatus == "InProgress" && $scope.customerOrders[i].RTPDue < today)&& $scope.customerOrders[i].RTPDue != null)  {
						$scope.customerOrders[i].RTPStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].QEQStatus == "InProgress" && $scope.customerOrders[i].QEQDue < today)&& $scope.customerOrders[i].QEQDue != null)  {
						$scope.customerOrders[i].QEQStatus = "Late";
						lateflag = true;
					}
					if(($scope.customerOrders[i].MEEStatus == "InProgress" && $scope.customerOrders[i].MEEDue < today)&& $scope.customerOrders[i].MEEDue != null)  {
						$scope.customerOrders[i].MEEStatus = "Late";
						lateflag = true;
					}

					

					if (lateflag == true) {
						$scope.lateprojects = $scope.lateprojects + 1;
					}
					$scope.projectscount =  i + 1;
					 
				}
				$scope.showdash = true;
			});

		}

		$scope.openurl = function(url, ID){
			url = url + ID;
		    window.open(url, '_blank');   // may else try $window
		} 

		$scope.openOrderFromCustomer = function(customer, order) {
			$scope.showdash = false;
			$scope.showrefresh = false;
			$scope.customerselected = customer;
			$scope.orderselected = order; 
			$(".activeHeader").removeClass("activeHeader", 1000, "ease");
			$("#ordertab").addClass("activeHeader", 1000, "ease");

		

				//Get Order Information from Submission Library
				var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Submission Library')/items?$filter=ConcatPO eq'" + order + "' and Customer_x0020_Number eq'" + customer + "'&$top=500";
		        var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
				$http(request).then(results => {

					$scope.selectedOrder = results.data.d.results[0];
					// Parsing out the file extnesion here for .xml
					var orderHeader = $scope.selectedOrder.Title.split(".");

					//Getting the Customer and Order Number From the file name.
					orderHeader = orderHeader[0].split("-");
					$scope.CustomerNumber = orderHeader[0];
					$scope.OrderNumber = orderHeader[1];

				}).catch(function(e){
							window.alert("That order does not exist. Please try again.");
				}).then(function(){
					// Get Tasks Available
					var url = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Product Realization Process Task List')/items?$filter=Process eq'" + $scope.selectedOrder.Process + "' and Order_x0020_Type eq'" + $scope.selectedOrder.Type + "'&$top=500";
		        	var request = { method: "GET", url: url, headers: {  "accept": "application/json;odata=verbose" } };
					$http(request).then(results => {
						$scope.availableTasks = results.data.d.results;
						$scope.orderDisplayed = true;
						var activeTasksUrl = _spPageContextInfo.siteAbsoluteUrl + "/plm/_api/web/lists/getbytitle('Order%20Tasks')/items?$filter=startswith(Title, '" + $scope.selectedOrder.Customer_x0020_Number + "-" + $scope.selectedOrder.ConcatPO + "')";
				    	var activeTasksRequest = { method: "GET", url: activeTasksUrl, headers: {  "accept": "application/json;odata=verbose" } };
						$http(activeTasksRequest).then(results => {
							$scope.orderTasks = results.data.d.results;
							for (var i = 0; i < $scope.orderTasks.length; i++) {
								var parsedTitle = $scope.orderTasks[i].Title.split("-");
								$scope.orderTasks[i].Title = parsedTitle[2]; 
							}

							//Loop throuugh available tasks for the given process
							for (var i = 0; i < $scope.availableTasks.length; i++) {

								//If task has been assigned assign details of the instance to the available and displayed task
								function isAssigned(orderTask) {
								  return orderTask.Title == $scope.availableTasks[i].Title;
								}

								//Finding if order tasks has been assigned
								$scope.availableTasks[i].orderDetails = $scope.orderTasks.find(isAssigned);

								//LOGIC TO DETERMINE STATUS OF TASK
								// 
								// 
								// 
								//First we want to check if task is assigned if no order details then hasn't so set class to not assigned 
								if ($scope.availableTasks[i].orderDetails == null) 
								{
									$scope.availableTasks[i].cssClass = "notassigned";


								} else 
								// So now all tasks below here have been assigned. 
								{
									// Does task have a due date to be considered late?
									if ($scope.availableTasks[i].orderDetails.DueDate == null) {
										//No due date so simply check if completed or not for class distinction
										if ($scope.availableTasks[i].orderDetails.Status == "Completed") 
										{
											$scope.availableTasks[i].cssClass = "completed";
										} else 
										{
											$scope.availableTasks[i].cssClass = "inprogress";
										}

									} else 
									//Task has a due date so first check if it's completed
									{
										if ($scope.availableTasks[i].orderDetails.Status == "Completed") 
										// Is completed so was it late or ontime?
										{
											if ($scope.availableTasks[i].orderDetails.Modified < ($scope.availableTasks[i].orderDetails.DueDate + 1))
											//Ontime so Completed 
											{
												$scope.availableTasks[i].cssClass = "completed";
											} 
											else
											// Late so compelted late
											{
												$scope.availableTasks[i].cssClass = "completedlate"
											}
											
										} else 
										
										// Is not completed so is it late or just in progress?
										{
											var today = String.format("{0:s}",new Date());
											var today = today + 1;
											if (($scope.availableTasks[i].orderDetails.DueDate + 1 )> today) 
											// not passed due date so just in progress
											{
												$scope.availableTasks[i].cssClass = "inprogress"
											} else 
											//passed the due date so late
											{
												$scope.availableTasks[i].cssClass = "late"
													var d1 = new Date(); //"now"
													var d2 = new Date($scope.availableTasks[i].orderDetails.DueDate)  // some date
													var ms = Math.abs(d1-d2);  // difference in milliseconds
													var d, h, m, s;
				  										s = Math.floor(ms / 1000);
													  m = Math.floor(s / 60);
													  s = s % 60;
													  h = Math.floor(m / 60);
													  m = m % 60;
													  d = Math.floor(h / 24);
													$scope.availableTasks[i].DaysLate = d;													
											}
										}

									}
								}
								// END LOGIC TREE FOR STATUS OF TASKS
								$scope.showdash = true;
								$scope.dashboard = "Order";
							}
						}).catch(function(e){
							window.alert("Hello");
						});
					});
				});
			
		}


		//Function to control what heading is displaye as active. 
		$scope.activeHeader = function() {
			$(".activeHeader").removeClass("activeHeader", 1000, "ease");
			if ($scope.dashboard == "Order") {
				$("#ordertab").addClass("activeHeader", 1000, "ease");

			} else if ($scope.dashboard == "Customer")  {
				$("#customertab").addClass("activeHeader", 1000, "ease");
			} else if ($scope.dashboard == "My")  {
				$("#mytab").addClass("activeHeader", 1000, "ease");
			} else if ($scope.dashboard == "Team")  {
				$("#teamtab").addClass("activeHeader", 1000, "ease");
			} else {

			};

		}


		$scope.teamactiveHeader = function() {
			$(".teamactiveHeader").removeClass("teamactiveHeader", 1000, "ease");
			if ($scope.team == "PMP") {
				$("#pmptab").addClass("teamactiveHeader", 1000, "ease");

			}  else {
				$("#toolingtab").addClass("teamactiveHeader", 1000, "ease");
			};

		}
		
	});



