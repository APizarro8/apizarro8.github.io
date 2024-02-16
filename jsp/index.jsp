<%@page import="es.tragsatec.configuracion.GestorConfiguracion" %>
<%@page session="true"%>
<%@page import="java.net.*,java.io.*, java.util.ArrayList, next.admin.login.logica.LoginControl"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>

<head>
    <% 
				
	String strurlGeoserver_ = (String)GestorConfiguracion.getInstancia().getPropiedad("urlGeoserver_");
	String strgeoserverRaizEspacioTrabajo = (String)GestorConfiguracion.getInstancia().getPropiedad("geoserverRaizEspacioTrabajo");
					
				
	%>
				
	<input type="hidden" name="urlGeoserver_" id="urlGeoserver_" value="<%=strurlGeoserver_%>">
	<input type="hidden" name="geoserverRaizEspacioTrabajo" id="geoserverRaizEspacioTrabajo" value="<%=strgeoserverRaizEspacioTrabajo%>">
					
	<title>Espacio Azuel</title>
	<!-- Latest compiled and minified CSS -->
	<!--<link rel="stylesheet" href="dist/css/edamon.min.css">-->
			
				
</head>	