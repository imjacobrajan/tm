# Network Protocol Ingestion

## Overview

The Network Protocol Ingestion component provides a unified interface for discovering and ingesting network topology information using multiple network discovery and routing protocols. This replaces the previous LLDP-only ingestion with support for:

- **LLDP** (Link Layer Discovery Protocol)
- **CDP** (Cisco Discovery Protocol) 
- **IS-IS** (Intermediate System to Intermediate System)
- **OSPF** (Open Shortest Path First)
- **BGP** (Border Gateway Protocol)

## Why Multiple Protocols?

Different protocols serve different purposes in network topology discovery:

### Layer 2 Discovery Protocols
- **LLDP**: Industry-standard protocol for discovering directly connected neighbors at Layer 2
- **CDP**: Cisco proprietary protocol for neighbor discovery, widely used in Cisco environments

### Routing Protocols (Layer 3)
- **IS-IS**: Link-state routing protocol used in service provider networks
- **OSPF**: Most common interior gateway protocol, used in enterprise and service provider networks
- **BGP**: Internet routing protocol, essential for understanding inter-domain connectivity

## Component Architecture

### Location
`/src/components/Network/NetworkProtocolIngestion.tsx`

### Type Definitions
Extended type definitions in `/src/types/index.ts` include:

```typescript
interface ProtocolInfo {
  lldp?: LLDPInfo;
  cdp?: CDPInfo;
  isis?: ISISInfo;
  ospf?: OSPFInfo;
  bgp?: BGPInfo;
}

interface ISISInfo {
  systemId: string;
  hostname: string;
  areaAddress: string[];
  interfaceLevel: 'level-1' | 'level-2' | 'level-1-2';
  circuitId: string;
  metric: number;
  priority: number;
  neighborState: 'up' | 'down' | 'init' | 'failed';
  holdTime: number;
  lastSeen: Date;
}

interface OSPFInfo {
  routerId: string;
  areaId: string;
  neighborState: 'down' | 'attempt' | 'init' | '2-way' | 'exstart' | 'exchange' | 'loading' | 'full';
  neighborPriority: number;
  deadTime: number;
  interfaceAddress: string;
  interfaceType: 'broadcast' | 'point-to-point' | 'nbma' | 'point-to-multipoint';
  cost: number;
  designatedRouter?: string;
  backupDesignatedRouter?: string;
  lastSeen: Date;
}

interface BGPInfo {
  remoteAS: number;
  localAS: number;
  routerId: string;
  peerAddress: string;
  peerState: 'idle' | 'connect' | 'active' | 'opensent' | 'openconfirm' | 'established';
  uptime: number;
  receivedPrefixes: number;
  sentPrefixes: number;
  lastSeen: Date;
  addressFamilies: string[];
}
```

## Features

### 1. Protocol Selection
Users can enable/disable specific protocols:
- Each protocol has a toggle for easy activation
- Visual indicators show which protocols are enabled
- Protocols can be configured independently

### 2. Protocol-Specific Settings

#### LLDP/CDP Settings
- Include CDP alongside LLDP
- Polling interval configuration
- Link timeout settings

#### IS-IS Settings
- Level selection (Level-1, Level-2, or both)
- Area filtering
- Metric collection toggle
- Polling interval

#### OSPF Settings
- Area specification (comma-separated list)
- Route collection toggle
- Metric collection toggle
- Polling interval

#### BGP Settings
- Route table collection
- Address family selection (IPv4, IPv6)
- Minimum prefix threshold
- Polling interval

### 3. Device Selection
- Single device ingestion
- Bulk ingestion across all devices
- Device information preview

### 4. Ingestion Results
Each protocol ingestion provides:

**For LLDP/CDP:**
- Number of neighbors found
- Links discovered
- Neighbor details (chassis ID, port, system name)
- Capabilities

**For IS-IS:**
- Number of neighbors
- Routes discovered
- System ID, area, and level information
- Neighbor state and metrics

**For OSPF:**
- Number of neighbors
- Routes discovered
- Router ID, area information
- Neighbor state and priorities
- DR/BDR information

**For BGP:**
- Number of peers
- Prefixes received/sent
- AS numbers
- Peer state
- Address families

### 5. Link Summary
- Visual representation of discovered links
- Protocol source indicator
- Confidence level
- Link status (UP/DOWN)
- Speed information

## Usage

### Accessing the Component

1. Navigate to **Analyze > Protocol Ingestion** in the sidebar
2. The component opens as a full-page view

### Running a Single Device Ingestion

1. **Select Protocols**: Click on protocol cards to enable/disable
2. **Configure Settings**: Select desired protocol and adjust settings
3. **Choose Device**: Select a device from the dropdown
4. **Start Ingestion**: Click "Start Ingestion"
5. **View Results**: Results appear with protocol-specific metrics

### Running Bulk Ingestion

1. **Select Protocols**: Enable desired protocols
2. **Configure Settings**: Adjust protocol settings as needed
3. **Start Bulk Ingestion**: Click "Bulk Ingestion"
4. **Monitor Progress**: Watch as results populate for all devices

### Interpreting Results

Each result card shows:
- Status icon (✅ success, ❌ error, ⚠️ warning)
- Protocol icon
- Device name
- Timestamp
- Protocol-specific metrics
- Error count
- Detailed information (expandable)

## Protocol-Specific Use Cases

### When to Use LLDP/CDP
- **Layer 2 topology discovery**: Map physical connections between switches
- **Port identification**: Match physical ports to logical interfaces
- **VLAN discovery**: Understand VLAN tagging on links
- **Cable tracing**: Verify physical connectivity
- **Known networks**: Works only within your managed network

### When to Use IS-IS
- **Service provider networks**: Common in ISP backbone networks
- **Data center fabrics**: Used in modern spine-leaf architectures
- **Area hierarchy**: Understand Level-1 and Level-2 boundaries
- **Metric analysis**: Calculate shortest paths
- **Large-scale networks**: Efficient for networks with hundreds of routers

### When to Use OSPF
- **Enterprise networks**: Most common IGP in corporate environments
- **Area design**: Understand OSPF area boundaries
- **DR/BDR relationships**: Identify designated routers
- **Route summarization**: See summarization points
- **Multi-vendor networks**: Works across vendors

### When to Use BGP
- **Internet connectivity**: Map connections to ISPs and peers
- **Autonomous system relationships**: Understand AS path
- **Prefix analysis**: See announced and received routes
- **Multi-homing**: Identify multiple internet connections
- **Cloud connectivity**: Discover connections to cloud providers
- **External networks**: Discover topology beyond your network

## Implementation Notes

### Current State
The component currently provides a **simulation** of protocol ingestion with:
- Mock data generation
- Realistic protocol-specific metrics
- Simulated timing delays

### Production Implementation
To implement in production, replace mock functions with:

1. **SNMP Queries**: 
   - LLDP MIB (LLDP-MIB, LLDP-EXT-MIB)
   - CDP MIB (CISCO-CDP-MIB)
   - IS-IS MIB (ISIS-MIB)
   - OSPF MIB (OSPF-MIB, OSPFv3-MIB)
   - BGP MIB (BGP4-MIB, BGP4-V2-MIB-JUNIPER)

2. **CLI Parsing**:
   - SSH/Telnet connections to devices
   - Parse show commands output
   - Examples:
     - `show lldp neighbors detail`
     - `show cdp neighbors detail`
     - `show isis neighbors`
     - `show ip ospf neighbors`
     - `show ip bgp summary`

3. **API Integration**:
   - RESTful APIs (for SDN controllers)
   - NETCONF/YANG
   - Vendor-specific APIs (Cisco DNA Center, Arista CloudVision, etc.)

### Backend Service Requirements

```
┌─────────────────────────────────────────┐
│    Network Protocol Ingestion Service   │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │ SNMP Client │  │ SSH Client  │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Protocol Parsers             │   │
│  │  • LLDP/CDP Parser              │   │
│  │  • IS-IS Parser                 │   │
│  │  • OSPF Parser                  │   │
│  │  • BGP Parser                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Topology Builder             │   │
│  │  • Link correlation             │   │
│  │  • Confidence scoring           │   │
│  │  • Duplicate detection          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Database Storage             │   │
│  │  • Time-series metrics          │   │
│  │  • Historical tracking          │   │
│  │  • Change detection             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Best Practices

### 1. Protocol Selection Strategy
- Start with **LLDP/CDP** for basic Layer 2 discovery
- Add **OSPF** or **IS-IS** for Layer 3 topology in your network
- Use **BGP** only for edge routers and external connectivity
- Don't enable all protocols on all devices (performance impact)

### 2. Polling Intervals
- **LLDP/CDP**: 5-15 minutes (devices rarely change)
- **IS-IS/OSPF**: 10-30 minutes (routing changes are less frequent)
- **BGP**: 15-60 minutes (BGP is stable once established)
- Adjust based on network size and change frequency

### 3. Credential Management
- Use read-only SNMP communities when possible
- Implement credential rotation
- Use SNMPv3 with encryption for security
- Separate credentials for different device roles

### 4. Error Handling
- Monitor for authentication failures
- Track timeout patterns
- Alert on significant discovery changes
- Implement retry logic with backoff

### 5. Performance Optimization
- Batch device queries
- Use async/parallel processing
- Cache stable information
- Implement rate limiting to avoid overwhelming devices

## Troubleshooting

### Common Issues

**No Neighbors Found (LLDP/CDP)**
- Verify LLDP/CDP is enabled on devices
- Check SNMP credentials
- Ensure device supports LLDP/CDP
- Check if ports are in administrative up state

**No Routes Discovered (IS-IS/OSPF)**
- Verify routing protocol is enabled
- Check area configuration matches
- Ensure SNMP access to routing MIBs
- Verify adjacencies are established

**No BGP Peers Found**
- Verify BGP is configured on device
- Check BGP peer state (should be "established")
- Ensure SNMP access to BGP MIBs
- Verify device is an edge router

**Authentication Errors**
- Validate SNMP community string
- Check SSH credentials
- Verify credential scoping rules
- Ensure device allows SNMP/SSH access from management station

## Future Enhancements

1. **Additional Protocols**:
   - ARP table analysis
   - MAC address table correlation
   - MPLS topology discovery
   - VXLAN tunnel discovery

2. **Enhanced Visualization**:
   - Real-time protocol state display
   - Interactive topology graphs
   - Protocol-specific diagram overlays
   - Change tracking visualization

3. **Advanced Analytics**:
   - Path redundancy analysis
   - Routing loop detection
   - Suboptimal path identification
   - Capacity planning insights

4. **Automation**:
   - Scheduled ingestion
   - Automatic discovery triggers
   - Integration with change management
   - Alerting on topology changes

## Related Components

- **Enhanced Network Map**: Visualizes discovered topology
- **Path Analysis**: Uses protocol data for path calculation
- **Reachability Analysis**: Leverages topology for reachability tests
- **Credentials Manager**: Manages authentication for protocol access
- **Discovery Wizard**: Integrates protocol ingestion into discovery workflow

## API Integration

When implementing backend services, the component expects this API structure:

```typescript
// POST /api/protocol-ingestion/start
{
  deviceId: string;
  protocols: ['lldp', 'isis', 'ospf', 'bgp'];
  settings: {
    lldp?: LLDPSettings;
    isis?: ISISSettings;
    ospf?: OSPFSettings;
    bgp?: BGPSettings;
  }
}

// Response
{
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  results: IngestionResult[];
}

// GET /api/protocol-ingestion/results/:jobId
{
  jobId: string;
  status: string;
  progress: number;
  results: IngestionResult[];
  errors: Error[];
}
```

## Conclusion

The Network Protocol Ingestion component provides a comprehensive, unified interface for multi-protocol network discovery. By supporting both Layer 2 discovery protocols (LLDP/CDP) and Layer 3 routing protocols (IS-IS, OSPF, BGP), it enables complete visibility into network topology across different architectural layers and beyond your directly managed network.

This approach allows network administrators to:
- Discover Layer 2 physical connectivity
- Map Layer 3 routing relationships
- Understand external connectivity (BGP)
- Correlate information across protocols
- Build a complete, accurate network topology database

