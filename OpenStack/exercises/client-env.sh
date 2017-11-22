#!/usr/bin/env bash

# **client-env.sh**

# Test OpenStack client environment variable handling

echo "*********************************************************************"
echo "Begin DevStack Exercise: $0"
echo "*********************************************************************"

# This script exits on an error so that errors don't compound and you see
# only the first error that occurred.
set -o errexit

# Print the commands being run so that we can see the command that triggers
# an error.  It is also useful for following as the install occurs.
set -o xtrace


# Settings
# ========

# Keep track of the current directory
EXERCISE_DIR=$(cd $(dirname "$0") && pwd)
TOP_DIR=$(cd $EXERCISE_DIR/..; pwd)

# Import common functions
source $TOP_DIR/functions

# Import configuration
source $TOP_DIR/openrc admin

# Import exercise configuration
source $TOP_DIR/exerciserc

# Unset all of the known NOVA_* vars
unset NOVA_API_KEY
unset NOVA_ENDPOINT_NAME
unset NOVA_PASSWORD
unset NOVA_PROJECT_ID
unset NOVA_REGION_NAME
unset NOVA_URL
unset NOVA_USERNAME

for i in OS_TENANT_NAME OS_USERNAME OS_PASSWORD OS_AUTH_URL; do
    is_set $i
    if [[ $? -ne 0 ]]; then
        echo "$i expected to be set"
        ABORT=1
    fi
done
if [[ -n "$ABORT" ]]; then
    exit 1
fi

# Set global return
RETURN=0

# Keystone client
# ---------------
if [[ "$ENABLED_SERVICES" =~ "key" ]]; then
    if [[ "$SKIP_EXERCISES" =~ "key" ]]; then
        STATUS_KEYSTONE="Skipped"
    else
        echo -e "\nTest Keystone"
        if openstack endpoint show identity; then
            STATUS_KEYSTONE="Succeeded"
        else
            STATUS_KEYSTONE="Failed"
            RETURN=1
        fi
    fi
fi

# Nova client
# -----------

if [[ "$ENABLED_SERVICES" =~ "n-api" ]]; then
    if [[ "$SKIP_EXERCISES" =~ "n-api" ]]; then
        STATUS_NOVA="Skipped"
    else
        # Test OSAPI
        echo -e "\nTest Nova"
        if nova flavor-list; then
            STATUS_NOVA="Succeeded"
        else
            STATUS_NOVA="Failed"
            RETURN=1
        fi

    fi
fi

# Cinder client
# -------------

if [[ "$ENABLED_SERVICES" =~ "c-api" ]]; then
    if [[ "$SKIP_EXERCISES" =~ "c-api" ]]; then
        STATUS_CINDER="Skipped"
    else
        echo -e "\nTest Cinder"
        if cinder list; then
            STATUS_CINDER="Succeeded"
        else
            STATUS_CINDER="Failed"
            RETURN=1
        fi
    fi
fi

# Glance client
# -------------

if [[ "$ENABLED_SERVICES" =~ "g-api" ]]; then
    if [[ "$SKIP_EXERCISES" =~ "g-api" ]]; then
        STATUS_GLANCE="Skipped"
    else
        echo -e "\nTest Glance"
        if openstack image list; then
            STATUS_GLANCE="Succeeded"
        else
            STATUS_GLANCE="Failed"
            RETURN=1
        fi
    fi
fi

# Swift client
# ------------


if [[ "$ENABLED_SERVICES" =~ "swift" || "$ENABLED_SERVICES" =~ "s-proxy" ]]; then
    if [[ "$SKIP_EXERCISES" =~ "swift" ]]; then
        STATUS_SWIFT="Skipped"
    else
        echo -e "\nTest Swift"
        if swift stat; then
            STATUS_SWIFT="Succeeded"
        else
            STATUS_SWIFT="Failed"
            RETURN=1
        fi
    fi
fi

set +o xtrace


# Results
# =======

function report {
    if [[ -n "$2" ]]; then
        echo "$1: $2"
    fi
}

echo -e "\n"
report "Keystone" $STATUS_KEYSTONE
report "Nova" $STATUS_NOVA
report "Cinder" $STATUS_CINDER
report "Glance" $STATUS_GLANCE
report "Swift" $STATUS_SWIFT

if (( $RETURN == 0 )); then
    echo "*********************************************************************"
    echo "SUCCESS: End DevStack Exercise: $0"
    echo "*********************************************************************"
fi

exit $RETURN
