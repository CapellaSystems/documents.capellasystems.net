// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  // Cambria Stream Sidebar
  StreamSidebar: [
    {
      type: 'category',
      label: 'Installation Guides',
      items: [
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            {
              type: 'category',
              label: 'AWS',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/AWS/placeholder',
                'Cambria Stream/Installation Guides/Kubernetes/AWS/cambria_stream_aws_kubernetes/index',
                'Cambria Stream/Installation Guides/Kubernetes/AWS/linux_cambria_stream_5_4_0_guide/index',
              ],
            },
            {
              type: 'category',
              label: 'Akamai',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/Akamai/placeholder',
                'Cambria Stream/Installation Guides/Kubernetes/Akamai/cambria_stream_akamai_kubernetes/index',
              ],
            },
            {
              type: 'category',
              label: 'Oracle',
              items: [
                'Cambria Stream/Installation Guides/Kubernetes/Oracle/placeholder',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'Cambria Stream/Installation Guides/Windows/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: [
        'Cambria Stream/Release Notes/placeholder',
        'Cambria Stream/Release Notes/cambria_stream_techspec/index',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'Cambria Stream/API/placeholder',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Cambria Stream/Tutorials/placeholder',
        'Cambria Stream/Tutorials/cambria_stream_primary_backup/index',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'Cambria Stream/FAQ/placeholder',
      ],
    },
  ],

  // Cambria FTC Sidebar
  FTCSidebar: [
    {
      type: 'category',
      label: 'Installation Guides',
      items: [
        {
          type: 'category',
          label: 'Kubernetes',
          items: [
            {
              type: 'category',
              label: 'AWS',
              items: [
                'Cambria FTC/Installation Guides/Kubernetes/AWS/cambria-cluster-ftc-aws',
              ],
            },
            {
              type: 'category',
              label: 'Akamai',
              items: [
                'Cambria FTC/Installation Guides/Kubernetes/Akamai/Akamai-Terraform_Kubernetes/cambria-cluster-ftc-terraform',
                'Cambria FTC/Installation Guides/Kubernetes/Akamai/Akamai-Kubernetes/cambria-cluster-ftc-akamai',
              ],
            },
            {
              type: 'category',
              label: 'Oracle',
              items: [
                'Cambria FTC/Installation Guides/Kubernetes/Oracle/cambria-cluster-ftc-oracle',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Windows',
          items: [
            'Cambria FTC/Installation Guides/Windows/placeholder',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Release Notes',
      items: [
        'Cambria FTC/Release Notes/FTC v5.5 to v4.0',
      ],
    },
    {
      type: 'category',
      label: 'API',
      items: [
        'Cambria FTC/API/Introduction',
        'Cambria FTC/API/API_Methods',
        'Cambria FTC/API/Event_Description',
        'Cambria FTC/API/Event_Attributes',
        {
          type: 'category',
          label: 'API Methods',
          items: [
            'Cambria FTC/API/methods/AddEvent',
            'Cambria FTC/API/methods/AddMachines',
            'Cambria FTC/API/methods/CheckEventSource',
            'Cambria FTC/API/methods/DeleteEvent',
            'Cambria FTC/API/methods/DeleteMachine',
            'Cambria FTC/API/methods/EmailTest',
            'Cambria FTC/API/methods/ExportEvents',
            'Cambria FTC/API/methods/GetEventHistory',
            'Cambria FTC/API/methods/GetEventInfo',
            'Cambria FTC/API/methods/GetEventInstancesList',
            'Cambria FTC/API/methods/GetEventPreview',
            'Cambria FTC/API/methods/GetEventsConflict',
            'Cambria FTC/API/methods/GetEventsList',
            'Cambria FTC/API/methods/GetMachineInfo',
            'Cambria FTC/API/methods/GetMachinesList',
            'Cambria FTC/API/methods/GetNotification',
            'Cambria FTC/API/methods/GetSettings',
            'Cambria FTC/API/methods/GetSwitchingLog',
            'Cambria FTC/API/methods/GetSystemInfo',
            'Cambria FTC/API/methods/GetSystemStatus',
            'Cambria FTC/API/methods/GetUnifiedLog',
            'Cambria FTC/API/methods/GetYouTubeThumbnail',
            'Cambria FTC/API/methods/ImportEvents',
            'Cambria FTC/API/methods/LiveControlAPI',
            'Cambria FTC/API/methods/SetEventInfo',
            'Cambria FTC/API/methods/SetMachineSettings',
            'Cambria FTC/API/methods/SetNotification',
            'Cambria FTC/API/methods/SetSettings',
            'Cambria FTC/API/methods/SetYouTubeThumbnail',
          ],
        },
        {
          type: 'category',
          label: 'Event Attributes',
          items: [
            'Cambria FTC/API/event_attributes/Instance',
            'Cambria FTC/API/event_attributes/SettingData',
            'Cambria FTC/API/event_attributes/Slot',
            'Cambria FTC/API/event_attributes/TargetInfo',
            'Cambria FTC/API/event_attributes/YouTubeCategory',
            'Cambria FTC/API/event_attributes/YouTubeStreamFormat',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      items: [
        'Cambria FTC/Tutorials/Arib-stdb3/index',
        'Cambria FTC/Tutorials/Audio watermarking integration with \'Kantar\' guide',
        'Cambria FTC/Tutorials/aws_ami_creation_editing/index',
        'Cambria FTC/Tutorials/cambria-ftc-stt',
        'Cambria FTC/Tutorials/cluster-redundancy',
        'Cambria FTC/Tutorials/Color Space Coversion/color-space-conversion',
        'Cambria FTC/Tutorials/delete_source/index',
        'Cambria FTC/Tutorials/FTC_Avid_Ingest_Guide/index',
        'Cambria FTC/Tutorials/ftc-and-cluster-trusted-executables',
        'Cambria FTC/Tutorials/Harmonic VOS Upload Guide/harmonic-vos-upload-guide',
        'Cambria FTC/Tutorials/Logo filter/logo-filter',
        'Cambria FTC/Tutorials/NexGuardFTC_Guide/nexguard-ftc-guide',
        'Cambria FTC/Tutorials/payg-licensing',
        'Cambria FTC/Tutorials/postgres_migration/database-migration',
        'Cambria FTC/Tutorials/scriptable_workflow_guide/scriptable-workflow',
        'Cambria FTC/Tutorials/scte35',
        'Cambria FTC/Tutorials/Snmp Guide/snmp-guide',
        'Cambria FTC/Tutorials/Subtitle Burn-In/subtitle-burnin',
        'Cambria FTC/Tutorials/Using the Teletrax Watermarking Filter/teletrax-watermarking',
        'Cambria FTC/Tutorials/Video Segments/video-segments',
        'Cambria FTC/Tutorials/XML Titler with Carbon Subtitle Workflow/carbon-subtitle-xml',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      items: [
        'Cambria FTC/FAQ/placeholder',
      ],
    },
  ],
};

export default sidebars;
