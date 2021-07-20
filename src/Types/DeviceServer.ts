type DeviceServer = {
    id: number;
    created: string;
    updated: string;
    ip: string;
    description: string;
    status: 'ACTIVE' | 'BLOCKED' | 'NEEDS_CONFIRMATION' | 'OBSOLETE';
};

export default DeviceServer;
