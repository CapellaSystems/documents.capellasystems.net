import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'VOD Transcoding',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        <p><strong>Cambria FTC:</strong> High-performance file transcoder with exceptional video quality and superior transcoding speed. Cloud-native or on-premises deployment options.</p>
        <p><strong>Cambria Cluster:</strong> Scalable network of FTC machines for large-volume video processing, managed through Cluster Manager.</p>
        <p><strong>Cambria FTC Packager:</strong> Flexible VOD packager supporting HLS, MPEG-Dash, and CMAF formats with encryption and ad insertion.</p>
      </>
    ),
  },
  {
    title: 'Live Encoding (On-Premise)',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        <p><strong>Cambria Live/Editor:</strong> Professional live studio encoder with robust ad insertion and reliable streaming output.</p>
        <p><strong>Cambria Broadcast Manager (BCM):</strong> Centralized management for multiple Live workstations, enabling automated workflows and scheduled streaming.</p>
      </>
    ),
  },
  {
    title: 'Cloud Solutions',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        <p><strong>Cambria Stream/Packager:</strong> Cloud-native live encoder and packager, easily deployable via Docker and scalable with Kubernetes.</p>
        <p><strong>Cambria Stream Manager:</strong> Web-based UI for managing cloud-based encoder networks with monitoring, alerts, and automated failover.</p>
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
