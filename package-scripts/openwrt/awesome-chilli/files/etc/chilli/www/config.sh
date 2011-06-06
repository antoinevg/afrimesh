!/bin/sh

#if [ -f config-local.sh ]; then
#    . ./config-local.sh
#else
#    [ -f /etc/chilli/defaults ] && . /etc/chilli/defaults
#    [ -f /etc/chilli/config ]   && . /etc/chilli/config
#fi

# read chilli configuration
hs_uamlisten=`uci get chilli.options.uamlisten`
hs_uamport=3990  

#TODO reg_mode
#TODO hs_openidauth
#TODO hs_uamport
#TODO hs_uamservice
#TODO hs_uamsecret

# export variables
reg_mode=${reg_mode:-$HS_REG_MODE}
[ "$reg_mode" = "self" ] && register=1
[ "$reg_mode" = "tos"  ] && tos=1
hs_openidauth=${hs_openidauth:-$HS_OPENIDAUTH}
hs_uamsecret=${hs_uamsecret:-$HS_UAMSECRET}
hs_uamlisten=${hs_uamlisten:-$HS_UAMLISTEN}
hs_uamport=${hs_uamport:-$HS_UAMPORT}
hs_uamservice=${hs_uamservice:-$HS_UAMSERVICE}

