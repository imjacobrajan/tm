# Grafana Dashboard Integration Guide

## Overview
The Grafana Dashboard integration allows you to view and interact with your existing Grafana monitoring dashboards directly within the Netpulse application.

## Features

### 1. **Dual Mode Support**
   - **Embed Mode**: View Grafana dashboards within the application using an iframe
   - **Redirect Mode**: Direct link to open Grafana in a new browser tab

### 2. **Configurable Settings**
   - Set your Grafana base URL
   - Configure specific dashboard paths
   - Settings are saved to browser localStorage for persistence

### 3. **Interactive Controls**
   - Refresh the embedded dashboard
   - Open in new tab
   - Fullscreen mode
   - Toggle between embed and redirect modes

## How to Access

1. Navigate to the **Monitoring** section in the sidebar
2. Click on **Grafana Dashboard**
3. The dashboard view will open

## Configuration

### First Time Setup

1. Click the **Configure** button in the header
2. Enter your Grafana configuration:
   - **Grafana Base URL**: Your Grafana instance URL (e.g., `http://localhost:3000` or `https://grafana.example.com`)
   - **Dashboard Path**: The specific dashboard path (e.g., `/d/your-dashboard-id/dashboard-name`)
3. Click **Save Configuration**

### Finding Your Dashboard Path

Your dashboard path can be found in the Grafana URL:
```
https://grafana.example.com/d/abc123xyz/network-topology?orgId=1
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^
                          This is your dashboard path
```

## Usage Modes

### Embed Mode (Default)
- Displays Grafana dashboard directly within the application
- Includes kiosk mode for clean viewing
- Refresh button to reload the dashboard
- Best for integrated monitoring experience

### Redirect Mode
- Provides a button to open Grafana in a new tab
- Best for full Grafana feature access
- Useful when iframe restrictions apply

## URL Parameters

When embedded, the following parameters are automatically added:
- `?orgId=1` - Organization ID
- `&kiosk=tv` - Kiosk mode for clean display
- `&theme=dark` - Dark theme to match application

## Troubleshooting

### Dashboard Not Loading in Embed Mode

**Issue**: Grafana dashboard shows blank or error in iframe

**Solutions**:
1. Check if your Grafana instance allows iframe embedding
2. Add the following to your Grafana configuration (`grafana.ini`):
   ```ini
   [security]
   allow_embedding = true
   cookie_samesite = none
   cookie_secure = true
   ```
3. If using HTTPS, ensure the Grafana URL also uses HTTPS
4. Use Redirect Mode as an alternative

### CORS Issues

**Issue**: Cross-Origin Resource Sharing errors

**Solution**: Configure your Grafana instance to allow requests from your application domain:
```ini
[server]
root_url = https://your-app-domain.com
```

### Authentication Issues

**Issue**: Prompted to login when viewing dashboard

**Solutions**:
1. Ensure you're logged into Grafana in the same browser
2. Configure Grafana for anonymous access (if appropriate):
   ```ini
   [auth.anonymous]
   enabled = true
   org_name = Main Org.
   org_role = Viewer
   ```
3. Use Redirect Mode and login in the new tab

## Best Practices

1. **Use HTTPS**: Always use HTTPS for production Grafana instances
2. **Set Appropriate Permissions**: Configure dashboard permissions based on user roles
3. **Test Both Modes**: Some networks may block iframe embedding; test both modes
4. **Bookmark Dashboards**: Save frequently used dashboard paths in the configuration
5. **Monitor Performance**: Embedded dashboards consume browser resources; use Redirect Mode for heavy dashboards

## Security Considerations

- Ensure your Grafana instance is properly secured with authentication
- Use role-based access control (RBAC) for dashboard permissions
- Consider using Grafana's anonymous access only for read-only dashboards
- Keep Grafana updated to the latest security patches
- Use HTTPS for all production deployments

## Examples

### Common Dashboard Paths

**Network Topology Dashboard**:
```
Dashboard Path: /d/network-topology/network-overview
```

**Device Performance Dashboard**:
```
Dashboard Path: /d/device-perf/device-performance
```

**Traffic Analysis Dashboard**:
```
Dashboard Path: /d/traffic-analysis/network-traffic
```

## Additional Features

### Refresh Dashboard
Click the refresh icon to reload the dashboard with the latest data.

### Fullscreen Mode
Click the fullscreen icon to expand the dashboard to fill your screen.

### Open in New Tab
Click the external link icon to open the dashboard in a new browser tab with full Grafana features.

## Support

For Grafana-specific issues, refer to the [Grafana Documentation](https://grafana.com/docs/).

For application integration issues, check your browser console for error messages and ensure your Grafana instance is accessible and properly configured.


