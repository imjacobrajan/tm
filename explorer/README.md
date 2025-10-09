# Topology Manager - Flow Documentation

This folder contains detailed explanations of all flows and modules in the Topology Manager application. Each document explains the step-by-step process, data flow, and real-world analogies to help understand how network topology management works.

## 📚 Documentation Index

### 🔍 Discovery & Scanning
- **[Network Discovery Flow](./01-network-discovery-flow.md)** - Complete discovery process from start to finish
- **[LLDP Link Ingestion](./02-lldp-link-ingestion.md)** - How network links are discovered and ingested
- **[Credential Management](./03-credential-management.md)** - Authentication and credential handling

### 🖥️ Device Management
- **[Device Lifecycle](./04-device-lifecycle.md)** - From discovery to monitoring
- **[Interface Management](./05-interface-management.md)** - Network interface handling
- **[Device Roles & Classification](./06-device-roles-classification.md)** - Automatic device categorization

### 🗺️ Visualization & Mapping
- **[Topology Visualization](./07-topology-visualization.md)** - Network diagram generation and display
- **[Geographic Mapping](./08-geographic-mapping.md)** - Location-based device mapping
- **[Geotagging Process](./09-geotagging-process.md)** - Adding location data to devices

### 🛣️ Analysis & Monitoring
- **[Path Analysis](./10-path-analysis.md)** - Network path discovery and analysis
- **[Reachability Testing](./11-reachability-testing.md)** - Connectivity verification
- **[Dependency Management](./12-dependency-management.md)** - Device relationship handling

### ⚙️ Configuration & Settings
- **[Settings Management](./13-settings-management.md)** - System configuration
- **[Schedule Management](./14-schedule-management.md)** - Automated task scheduling
- **[Report Generation](./15-report-generation.md)** - Data export and reporting

## 🎯 Quick Start Guide

1. **Start with Discovery**: Read the Network Discovery Flow to understand how devices are found
2. **Understand Visualization**: Check Topology Visualization to see how networks are displayed
3. **Learn Analysis**: Review Path Analysis and Reachability Testing for network troubleshooting
4. **Configure System**: Explore Settings Management for system customization

## 🔄 Complete Workflow

```
Discovery → Classification → Visualization → Analysis → Monitoring → Reporting
    ↓           ↓              ↓            ↓          ↓           ↓
  Scan      Device Roles    Topology    Path Test   Health     Export
  Network   Assignment      Diagram     Reachability Check     Reports
```

## 🏢 Real-World Analogy

Think of the Topology Manager like a **city planning department**:

- **Discovery** = Surveying the city to find all buildings and roads
- **Classification** = Categorizing buildings (residential, commercial, industrial)
- **Visualization** = Creating city maps and blueprints
- **Analysis** = Planning routes between locations
- **Monitoring** = Checking traffic flow and infrastructure health
- **Reporting** = Generating city statistics and reports

Each module works together to provide a complete picture of your network infrastructure, just like city planning provides a complete view of urban infrastructure.
