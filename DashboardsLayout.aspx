<%@ Page language="C#"   Inherits="Microsoft.SharePoint.Publishing.PublishingLayoutPage,Microsoft.SharePoint.Publishing,Version=16.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="OSRVWC" Namespace="Microsoft.Office.Server.WebControls" Assembly="Microsoft.Office.Server, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="OSRVUPWC" Namespace="Microsoft.Office.Server.WebControls" Assembly="Microsoft.Office.Server.UserProfiles, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="SPSWC" Namespace="Microsoft.SharePoint.Portal.WebControls" Assembly="Microsoft.SharePoint.Portal, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="SEARCHWC" Namespace="Microsoft.Office.Server.Search.WebControls" Assembly="Microsoft.Office.Server.Search, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %> <%@ Register Tagprefix="PublishingWebControls" Namespace="Microsoft.SharePoint.Publishing.WebControls" Assembly="Microsoft.SharePoint.Publishing, Version=16.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderId="PlaceHolderAdditionalPageHead" runat="server">
	<style type="text/css">
		.page-title
		{
			display: none;
		}
	</style>
	<SharePoint:CssRegistration name="<% $SPUrl:~sitecollection/_catalogs/masterpage/PLMDashboards/css/core.css %>" runat="server" After="Core.css"/>

	<!-- JavaScript -->
    <asp:Literal ID="Literal1" runat="server" text="<script type='text/javascript' src='" />
    <asp:Literal ID="Literal2" runat="server" text="<% $SPUrl:~sitecollection/_catalogs/masterpage/PLMDashboards/scripts/jquery.js %>" />
    <asp:Literal ID="Literal3" runat="server" text="'></script>" />
    <asp:Literal ID="Literal4" runat="server" text="<script type='text/javascript' src='" />
    <asp:Literal ID="Literal5" runat="server" text="<% $SPUrl:~sitecollection/_catalogs/masterpage/PLMDashboards/scripts/angular.js %>" />
    <asp:Literal ID="Literal6" runat="server" text="'></script>" />
    <asp:Literal ID="Literal7" runat="server" text="<script type='text/javascript' src='" />
    <asp:Literal ID="Literal8" runat="server" text="<% $SPUrl:~sitecollection/_catalogs/masterpage/PLMDashboards/scripts/angular-animate.js %>" />
    <asp:Literal ID="Literal9" runat="server" text="'></script>" />
    <asp:Literal ID="Literal10" runat="server" text="<script type='text/javascript' src='" />
    <asp:Literal ID="Literal11" runat="server" text="<% $SPUrl:~sitecollection/_catalogs/masterpage/PLMDashboards/scripts/core.js %>" />
    <asp:Literal ID="Literal12" runat="server" text="'></script>" />

	<SharePoint:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/>
	<style type="text/css" src=""></style>
	<PublishingWebControls:EditModePanel runat="server" id="editmodestyles">
		<!-- Styles for edit mode only-->
		<SharePoint:CssRegistration name="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/edit-mode-21.css %>"
			After="<% $SPUrl:~sitecollection/Style Library/~language/Core Styles/page-layouts-21.css %>" runat="server"/> 
	</PublishingWebControls:EditModePanel>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
	<SharePoint:FieldValue id="PageTitle" FieldName="Title" runat="server"/>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server"> Product Realization Dashboards
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderPageImage" runat="server">
	<img src="/_layouts/images/blank.gif" alt="">
</asp:Content>

<asp:Content ContentPlaceHolderId="PlaceHolderTitleBreadcrumb" runat="server"/>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<main ng-app="PlmApp">
	<plm-tool stages="stages"></plm-tool>
	
</main>


</asp:Content>
