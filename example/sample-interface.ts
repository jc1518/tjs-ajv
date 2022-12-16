/**
 * TJS API document
 * https://github.com/YousefED/typescript-json-schema/blob/master/api.md
 */

/**
 * Nested structure
 * Config <- EcsConfig <- VpcConfig
 */

/**
 * VPC config
 * @additionalProperties false
 * @unsupportedAnnotationThatShouldBeIgnored
 */
export interface VpcConfig {
  /**
   * VPC ID for ECS cluster. e.g vpc-0e992e4afc4d70000
   * @TJS-pattern ^vpc-[a-z0-9]*$
   */
  vpc_id: string;

  /**
   * Interconnect subnet IDs for ECS service. e.g [subnet-0c7b6e40ab7a5aaaa, subnet-0e8b515cd754ebbbb]
   * @items.type string
   * @items.pattern ^subnet-[a-z0-9]*$
   */
  interconnect_subnet_ids: string[];

  /**
   * Application subnet IDs for ECS task. e.g [subnet-0d86e40ab7a5cccc, subnet-0f9b515cd754edddd]
   * @items.type string
   * @items.pattern ^subnet-[a-z0-9]*$
   */
  application_subnet_ids: string[];
}

/**
 * ECS config
 * @additionalProperties false
 * @unsupportedAnnotationThatShouldBeIgnored
 */
export interface EcsConfig {
  /**
   * ECR repository URI for application image. e.g 123456789000.dkr.ecr.ap-southeast-2.amazonaws.com/sample
   */
  image_uri: string;

  /**
   * Image tag for application image, e.g 1.0
   * @default latest
   */
  image_tag?: string;

  /**
   * VPC config
   * @additionalProperties false
   */
  vpc_config: VpcConfig;

  /**
   * The number of cpu units used by the ECS task.
   * cpu_units - Avaiable memory_limit
   * @TJS-type integer
   */
  cpu_units: number;

  /**
   * The amount (in MiB) of memory used by the task.
   * cpu_units - Avaiable memory_limit
   * @TJS-type integer
   */
  memory_limit: number;

  /**
   * Minimum task count for ECS service auto scaling group. e.g 1
   * @TJS-type integer
   * @minimum 1
   */
  min_task: number;

  /**
   * Maximum task count for ECS service auto scaling group. e.g 3
   * @TJS-type integer
   * @minimum 1
   */
  max_task: number;

  /**
   * Weight value designates the relative percentage of the total number of tasks launched that use fargate spot instance. e.g 2
   * @TJS-type integer
   * @minimum 0
   */
  spot_weight: number;

  /**
   * Weight value designates the relative percentage of the total number of tasks launched that use fargate on-demand instance. e.g 1
   * @TJS-type integer
   * @minimum 0
   */
  on_demand_weight: number;

  /**
   * ECS container port for exposing. e.g 80
   * @TJS-type integer
   */
  container_port?: number;

  /**
   * ECS service port for ingressing, default is 80 if not specified.
   * @TJS-type integer
   * @default 80
   */
  service_port?: number;

  /**
   * CPU utilization threshold for auto scaling, default is 70 if not specified.
   * @TJS-type integer
   * @default 70
   */
  cpu_scaling_utilization?: number;

  /**
   * Memory utilization threshold for auto scaling, default is 70 if not specified.
   * @TJS-type integer
   * @default 70
   */
  memory_scaling_utilization?: number;

  /**
   * Cooldown duration (in seconds) for auto scaling in, default is 120 if not specified.
   * @TJS-type integer
   * @default 120
   */
  scale_in_cooldown_duration?: number;

  /**
   * Cooldown duration (in seconds) for auto scaling out, default is 60 if not specified.
   * @TJS-type integer
   * @default 60
   */
  scale_out_cooldown_duration?: number;
}

/**
 * Application config
 * @additionalProperties false
 * @unsupportedAnnotationThatShouldBeIgnored
 */
export interface Config {
  /**
   * Application name which will be used as the CloudFormation stack name. e.g demo-application
   * @TJS-pattern ^[A-Za-z][A-Za-z0-9-]*$
   */
  app_name: string;

  /**
   * Email address
   * @TJS-format email
   */
  email: string;

  /**
   * AWS account which the application will be deployed to. e.g 123456789000
   * @TJS-pattern ^\d{12}$
   */
  account_id: string;

  /**
   * AWS region which the application will be deployed to. e.g ap-southeast-2
   * @default ap-southeast-2
   */
  account_region?: string;

  /**
   * ECS config
   * @additionalProperties true
   */
  ecs_config: EcsConfig;
}
