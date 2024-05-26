resource "aws_vpc" "emovie_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
}

resource "aws_subnet" "customer_public_subnet_a" {
  vpc_id                  = aws_vpc.emovie_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.provider_region}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "customer_public_subnet_b" {
  vpc_id                  = aws_vpc.emovie_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.provider_region}b"
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "emovie_internet_gateway" {
  vpc_id = aws_vpc.emovie_vpc.id
}

resource "aws_route_table" "emovie_public_rt" {
  vpc_id = aws_vpc.emovie_vpc.id
}

resource "aws_route" "default_route" {
  route_table_id         = aws_route_table.emovie_public_rt.id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.emovie_internet_gateway.id
}

resource "aws_route_table_association" "customer_public_assoc_a" {
  subnet_id      = aws_subnet.customer_public_subnet_a.id
  route_table_id = aws_route_table.emovie_public_rt.id
}

resource "aws_route_table_association" "customer_public_assoc_b" {
  subnet_id      = aws_subnet.customer_public_subnet_b.id
  route_table_id = aws_route_table.emovie_public_rt.id
}

resource "aws_security_group" "customer_sg" {
  name        = "customer_sg"
  description = "Allow inbound traffic - frontend"
  vpc_id      = aws_vpc.emovie_vpc.id
}

resource "aws_vpc_security_group_ingress_rule" "allow_ssh" {
  security_group_id = aws_security_group.customer_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 22
  ip_protocol       = "tcp"
  to_port           = 22
}

resource "aws_vpc_security_group_ingress_rule" "allow_http" {
  security_group_id = aws_security_group.customer_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 80
  ip_protocol       = "tcp"
  to_port           = 80
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.customer_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  from_port         = 0
  ip_protocol       = "-1"
  to_port           = 0
}

resource "aws_key_pair" "generated_key" {
  key_name   = "ssh_key"
  public_key = file("ssh_key.pub")
}

resource "aws_instance" "customer_vm_frontend_1" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.customer_sg.id]
  subnet_id              = aws_subnet.customer_public_subnet_a.id

  root_block_device {
    volume_size = 10
  }

  depends_on = [aws_instance.customer_vm_backend_1]
}

resource "aws_instance" "customer_vm_frontend_2" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.customer_sg.id]
  subnet_id              = aws_subnet.customer_public_subnet_b.id


  root_block_device {
    volume_size = 10
  }

  depends_on = [aws_instance.customer_vm_backend_2]
}

resource "aws_instance" "customer_vm_backend_1" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.customer_sg.id]
  subnet_id              = aws_subnet.customer_public_subnet_a.id

  root_block_device {
    volume_size = 10
  }
}

resource "aws_instance" "customer_vm_backend_2" {
  instance_type          = var.instance_type
  ami                    = data.aws_ami.vm_ami.id
  key_name               = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.customer_sg.id]
  subnet_id              = aws_subnet.customer_public_subnet_b.id

  root_block_device {
    volume_size = 10
  }
}

resource "aws_lb" "customer_lb" {
  name               = "emovie"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.customer_sg.id]
  subnets            = [aws_subnet.customer_public_subnet_a.id, aws_subnet.customer_public_subnet_b.id]

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "customer_lb_target_group" {
  name        = "emovie"
  port        = 80
  protocol    = "HTTP"
  target_type = "instance"
  vpc_id      = aws_vpc.emovie_vpc.id
}

resource "aws_lb_listener" "customer_lb_listener" {
  load_balancer_arn = aws_lb.customer_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    target_group_arn = aws_lb_target_group.customer_lb_target_group.arn
    type             = "forward"
  }
}

resource "aws_lb_target_group_attachment" "customer_lb_attachment_1" {
  target_group_arn = aws_lb_target_group.customer_lb_target_group.arn
  target_id        = aws_instance.customer_vm_frontend_1.id
}

resource "aws_lb_target_group_attachment" "customer_lb_attachment_2" {
  target_group_arn = aws_lb_target_group.customer_lb_target_group.arn
  target_id        = aws_instance.customer_vm_frontend_2.id
}
