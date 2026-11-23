variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "portafolio-kail"
}

variable "instance_name" {
  description = "Nombre de la maquina virtual"
  type        = string
  default     = "servidor-portafolio"
}

variable "ubuntu_version" {
  description = "Version del sistema operativo"
  type        = string
  default     = "24.04"
}

variable "instance_size" {
  description = "Tamano de la maquina virtual"
  type        = string
  default     = "small"
}

variable "allowed_ssh_cidr" {
  description = "Rango IP autorizado para SSH"
  type        = string
  default     = "0.0.0.0/0"
}
